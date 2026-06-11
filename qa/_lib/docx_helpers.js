// Lightweight DOCX builder — zero external deps. We hand-roll a minimal Office
// Open XML package (.docx is a ZIP of XML parts). Output is opened cleanly by
// MS Word, Google Docs, and macOS Preview.
//
// Authored 2026-04-26 to close the missing /qa/ infrastructure flagged in the
// 2026-04-25 findings. Used by the three persona report generators.

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function findLatestFindings() {
  const dir = path.join(__dirname, '..', 'findings');
  const files = fs.readdirSync(dir)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort();
  if (!files.length) throw new Error('No findings files in /qa/findings/');
  const latest = files[files.length - 1];
  const previous = files.length >= 2 ? files[files.length - 2] : null;
  return {
    latest: JSON.parse(fs.readFileSync(path.join(dir, latest), 'utf8')),
    latestName: latest,
    previous: previous ? JSON.parse(fs.readFileSync(path.join(dir, previous), 'utf8')) : null,
    previousName: previous
  };
}

function xmlEscape(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// --- Minimal ZIP writer (store + deflate, no encryption, no zip64) ---
function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
    }
  }
  return (~crc) >>> 0;
}

function buildZip(entries) {
  // entries: [{name, data: Buffer}]
  const localChunks = [];
  const central = [];
  let offset = 0;
  for (const e of entries) {
    const nameBuf = Buffer.from(e.name, 'utf8');
    const data = e.data;
    const crc = crc32(data);
    const compressed = zlib.deflateRawSync(data);
    const useDeflate = compressed.length < data.length;
    const stored = useDeflate ? compressed : data;
    const method = useDeflate ? 8 : 0;

    // Local file header
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);          // version needed
    local.writeUInt16LE(0, 6);           // gen flag
    local.writeUInt16LE(method, 8);      // method
    local.writeUInt16LE(0, 10);          // mod time
    local.writeUInt16LE(0x21, 12);       // mod date (Jan 1 1980)
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(stored.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);

    localChunks.push(local, nameBuf, stored);
    const localOffset = offset;
    offset += local.length + nameBuf.length + stored.length;

    // Central directory
    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);             // version made by
    cd.writeUInt16LE(20, 6);             // version needed
    cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(method, 10);
    cd.writeUInt16LE(0, 12);
    cd.writeUInt16LE(0x21, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(stored.length, 20);
    cd.writeUInt32LE(data.length, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(localOffset, 42);
    central.push(cd, nameBuf);
  }

  const cdSize = central.reduce((s, b) => s + b.length, 0);
  const cdOffset = offset;

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);                  // disk number
  eocd.writeUInt16LE(0, 6);                  // disk where CD starts
  eocd.writeUInt16LE(entries.length, 8);     // CD records on this disk
  eocd.writeUInt16LE(entries.length, 10);    // total CD records
  eocd.writeUInt32LE(cdSize, 12);            // size of CD
  eocd.writeUInt32LE(cdOffset, 16);          // offset of start of CD
  eocd.writeUInt16LE(0, 20);                 // comment length

  return Buffer.concat([...localChunks, ...central, eocd]);
}

// --- DOCX parts ---
const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;

const ROOT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;

const DOC_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
</Relationships>`;

const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="22"/></w:rPr></w:rPrDefault>
    <w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:spacing w:before="360" w:after="120"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="36"/><w:color w:val="161614"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:spacing w:before="280" w:after="100"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:sz w:val="28"/><w:color w:val="161614"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:spacing w:before="220" w:after="80"/><w:outlineLvl w:val="2"/></w:pPr><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="333333"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="ListBullet"><w:name w:val="List Bullet"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Code"><w:name w:val="Code"/><w:basedOn w:val="Normal"/><w:pPr><w:shd w:val="clear" w:color="auto" w:fill="F5F1E8"/><w:spacing w:before="60" w:after="60"/></w:pPr><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:sz w:val="18"/></w:rPr></w:style>
</w:styles>`;

const SETTINGS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:zoom w:percent="100"/>
  <w:defaultTabStop w:val="720"/>
</w:settings>`;

function coreXml(title, creator, description) {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${xmlEscape(title)}</dc:title>
  <dc:creator>${xmlEscape(creator)}</dc:creator>
  <dc:description>${xmlEscape(description)}</dc:description>
  <cp:lastModifiedBy>${xmlEscape(creator)}</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>
</cp:coreProperties>`;
}

const APP_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
  <Application>NakshIQ Daily QA Generator</Application>
</Properties>`;

// --- Document content builder (fluent) ---
class DocBuilder {
  constructor() { this.body = []; }
  h1(text) {
    this.body.push(`<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t xml:space="preserve">${xmlEscape(text)}</w:t></w:r></w:p>`);
    return this;
  }
  h2(text) {
    this.body.push(`<w:p><w:pPr><w:pStyle w:val="Heading2"/></w:pPr><w:r><w:t xml:space="preserve">${xmlEscape(text)}</w:t></w:r></w:p>`);
    return this;
  }
  h3(text) {
    this.body.push(`<w:p><w:pPr><w:pStyle w:val="Heading3"/></w:pPr><w:r><w:t xml:space="preserve">${xmlEscape(text)}</w:t></w:r></w:p>`);
    return this;
  }
  p(text) {
    if (text === null || text === undefined || text === '') {
      this.body.push(`<w:p/>`);
      return this;
    }
    this.body.push(`<w:p><w:r><w:t xml:space="preserve">${xmlEscape(text)}</w:t></w:r></w:p>`);
    return this;
  }
  // Paragraph with mixed runs: array of {text, bold, code, color}
  prich(runs) {
    const parts = runs.map(r => {
      const rpr = [];
      if (r.bold) rpr.push('<w:b/>');
      if (r.code) rpr.push('<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="18"/>');
      if (r.color) rpr.push(`<w:color w:val="${r.color}"/>`);
      const rprBlock = rpr.length ? `<w:rPr>${rpr.join('')}</w:rPr>` : '';
      return `<w:r>${rprBlock}<w:t xml:space="preserve">${xmlEscape(r.text)}</w:t></w:r>`;
    }).join('');
    this.body.push(`<w:p>${parts}</w:p>`);
    return this;
  }
  bullet(text) {
    this.body.push(`<w:p><w:pPr><w:pStyle w:val="ListBullet"/></w:pPr><w:r><w:t xml:space="preserve">• ${xmlEscape(text)}</w:t></w:r></w:p>`);
    return this;
  }
  code(text) {
    const lines = String(text).split('\n');
    for (const line of lines) {
      this.body.push(`<w:p><w:pPr><w:pStyle w:val="Code"/></w:pPr><w:r><w:t xml:space="preserve">${xmlEscape(line || ' ')}</w:t></w:r></w:p>`);
    }
    return this;
  }
  // Table: headers (array of strings), rows (array of arrays)
  table(headers, rows, opts = {}) {
    const widthPct = opts.widthPct || 100;
    const borderColor = '999999';
    const tblPr = `<w:tblPr>
      <w:tblW w:w="${widthPct * 50}" w:type="pct"/>
      <w:tblBorders>
        <w:top w:val="single" w:sz="4" w:color="${borderColor}"/>
        <w:left w:val="single" w:sz="4" w:color="${borderColor}"/>
        <w:bottom w:val="single" w:sz="4" w:color="${borderColor}"/>
        <w:right w:val="single" w:sz="4" w:color="${borderColor}"/>
        <w:insideH w:val="single" w:sz="4" w:color="${borderColor}"/>
        <w:insideV w:val="single" w:sz="4" w:color="${borderColor}"/>
      </w:tblBorders>
    </w:tblPr>`;
    const headerCells = headers.map(h =>
      `<w:tc><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="161614"/></w:tcPr>` +
      `<w:p><w:r><w:rPr><w:b/><w:color w:val="F5F1E8"/></w:rPr><w:t xml:space="preserve">${xmlEscape(h)}</w:t></w:r></w:p></w:tc>`
    ).join('');
    const headerRow = `<w:tr>${headerCells}</w:tr>`;
    const bodyRows = rows.map(row => {
      const cells = row.map(c => {
        const text = c === null || c === undefined ? '' : String(c);
        // Cells can contain newlines — split into multiple <w:p>
        const paras = text.split('\n').map(line =>
          `<w:p><w:r><w:t xml:space="preserve">${xmlEscape(line)}</w:t></w:r></w:p>`
        ).join('');
        return `<w:tc>${paras || '<w:p/>'}</w:tc>`;
      }).join('');
      return `<w:tr>${cells}</w:tr>`;
    }).join('');
    this.body.push(`<w:tbl>${tblPr}${headerRow}${bodyRows}</w:tbl><w:p/>`);
    return this;
  }
  divider() {
    this.body.push(`<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:color="161614"/></w:pBdr></w:pPr></w:p>`);
    return this;
  }
  pageBreak() {
    this.body.push(`<w:p><w:r><w:br w:type="page"/></w:r></w:p>`);
    return this;
  }
  build() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${this.body.join('')}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body>
</w:document>`;
  }
}

function writeDocx(filePath, title, creator, description, builder) {
  const docXml = builder.build();
  const entries = [
    { name: '[Content_Types].xml', data: Buffer.from(CONTENT_TYPES, 'utf8') },
    { name: '_rels/.rels', data: Buffer.from(ROOT_RELS, 'utf8') },
    { name: 'word/_rels/document.xml.rels', data: Buffer.from(DOC_RELS, 'utf8') },
    { name: 'word/document.xml', data: Buffer.from(docXml, 'utf8') },
    { name: 'word/styles.xml', data: Buffer.from(STYLES, 'utf8') },
    { name: 'word/settings.xml', data: Buffer.from(SETTINGS, 'utf8') },
    { name: 'docProps/core.xml', data: Buffer.from(coreXml(title, creator, description), 'utf8') },
    { name: 'docProps/app.xml', data: Buffer.from(APP_XML, 'utf8') }
  ];
  const buf = buildZip(entries);
  fs.writeFileSync(filePath, buf);
  return { bytes: buf.length, path: filePath };
}

// Compute deltas vs previous run for display
function computeRegressionDeltas(latest, previous) {
  if (!previous) return [];
  const prevById = Object.fromEntries((previous.regression_matrix || []).map(b => [b.id, b]));
  const deltas = [];
  for (const cur of latest.regression_matrix || []) {
    const prev = prevById[cur.id];
    if (!prev) {
      deltas.push({ id: cur.id, change: 'NEW', from: '-', to: cur.status_today });
    } else if (prev.status_today !== cur.status_today) {
      deltas.push({ id: cur.id, change: 'CHANGED', from: prev.status_today, to: cur.status_today });
    }
  }
  return deltas;
}

module.exports = {
  findLatestFindings,
  computeRegressionDeltas,
  DocBuilder,
  writeDocx,
  xmlEscape
};
