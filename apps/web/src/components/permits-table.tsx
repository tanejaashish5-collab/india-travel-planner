import Link from "next/link";

type Row = {
  state: string;
  stateId: string;
  permitType: string;
  indianProcess: string;
  foreignerProcess: string;
  validity: string;
  officialUrl: string;
  officialLabel: string;
  notes?: string;
};

const ROWS: Row[] = [
  {
    state: "Ladakh",
    stateId: "ladakh",
    permitType: "Inner Line Permit (ILP) for Indians · Protected Area Permit (PAP) for foreigners",
    indianProcess: "Apply online. Required for Nubra, Pangong, Tso Moriri, Dah-Hanu, Hanle, Turtuk, and all areas beyond Khaltsi / Khardung La / Chang La.",
    foreignerProcess: "PAP arranged via a registered travel agent in Leh. Usually issued same-day. Single entry, group of 2+ typically required.",
    validity: "Up to 21 days. Carry multiple photocopies; checkpoints retain one per post.",
    officialUrl: "https://www.lahdc.leh.gov.in/",
    officialLabel: "Leh Autonomous Hill Development Council",
    notes: "Nominal fee + per-day environment charge. Verify current fees on the portal before travel.",
  },
  {
    state: "Sikkim",
    stateId: "sikkim",
    permitType: "ILP for North Sikkim for all · Nathula special permit",
    indianProcess: "ILP for Lachen, Lachung, Yumthang, Gurudongmar arranged by your registered tour operator. Nathula Pass day-trip permit issued at Gangtok tourism office only on Wed / Thu / Sat / Sun, minimum 4 pax.",
    foreignerProcess: "RAP (Restricted Area Permit) for whole state issued on arrival at Rangpo / Melli / Bagdogra counter with passport + visa copy. Separate ILP for North Sikkim via a registered operator.",
    validity: "RAP typically 30 days, ILP 3–5 days by region.",
    officialUrl: "https://www.sikkimtourism.gov.in/",
    officialLabel: "Sikkim Tourism Department",
    notes: "Tso Lhamo, Chopta Valley, and Zemu Glacier are closed to foreigners.",
  },
  {
    state: "Arunachal Pradesh",
    stateId: "arunachal-pradesh",
    permitType: "ILP (Indians) · PAP (foreigners)",
    indianProcess: "Apply online or via liaison offices (Delhi, Guwahati, Kolkata, Shillong, Itanagar). Single-entry, multiple-destination permit.",
    foreignerProcess: "PAP via the Ministry of Home Affairs through a registered travel agent. Minimum group of 2 typically required. Processing takes 2–4 weeks.",
    validity: "ILP up to 30 days. PAP up to 30 days, specific districts only.",
    officialUrl: "https://arunachalilp.com/",
    officialLabel: "Arunachal ILP official portal",
    notes: "Tawang, Mechuka, Ziro, Pasighat all accessible with ILP. Some border zones need additional clearance.",
  },
  {
    state: "Nagaland",
    stateId: "nagaland",
    permitType: "ILP (Indians only — foreigners no longer need a permit)",
    indianProcess: "Apply online at the Nagaland ILP portal or at entry points (Dimapur, Kohima). Digital permit accepted at checkpoints.",
    foreignerProcess: "No permit required since 2011. Passport + visa sufficient. Some regions still restricted — check with local tourism office.",
    validity: "Up to 30 days. Renewable from within the state.",
    officialUrl: "https://ilp.nagaland.gov.in/",
    officialLabel: "Nagaland ILP portal",
  },
  {
    state: "Mizoram",
    stateId: "mizoram",
    permitType: "ILP (Indians)",
    indianProcess: "Apply at Mizoram liaison offices (Delhi, Kolkata, Guwahati, Silchar) or online. Also issued at Lengpui airport on arrival.",
    foreignerProcess: "No separate permit currently required for foreigners in most districts, but advisory guidance changes — verify with the Home Department before travel.",
    validity: "15 days, extendable in Aizawl.",
    officialUrl: "https://dipr.mizoram.gov.in/",
    officialLabel: "Directorate of Information & Public Relations, Mizoram",
  },
  {
    state: "Manipur",
    stateId: "manipur",
    permitType: "PAP for foreigners · No permit for Indians (since 2011)",
    indianProcess: "No permit required.",
    foreignerProcess: "PAP via the Ministry of Home Affairs through a registered travel agent. Imphal and most of the plains are accessible; some hill districts remain restricted.",
    validity: "Typically 10–15 days, specific districts only.",
    officialUrl: "https://www.mha.gov.in/",
    officialLabel: "Ministry of Home Affairs",
    notes: "Security situation is fluid — check the MEA travel advisory before planning.",
  },
];

export default function PermitsTable() {
  return (
    <div className="space-y-6">
      {ROWS.map((row) => (
        <div key={row.stateId} className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <h2 className="font-serif italic font-medium text-2xl sm:text-3xl text-foreground" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
              {row.state}
            </h2>
            <Link href={`/en/state/${row.stateId}`} className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#E55642] hover:underline">
              Destinations in {row.state} →
            </Link>
          </div>
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80 mb-4">
            {row.permitType}
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80 mb-1">For Indian citizens</dt>
              <dd className="text-foreground leading-relaxed">{row.indianProcess}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80 mb-1">For foreign nationals</dt>
              <dd className="text-foreground leading-relaxed">{row.foreignerProcess}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80 mb-1">Validity</dt>
              <dd className="text-foreground">{row.validity}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80 mb-1">Official source</dt>
              <dd>
                <a
                  href={row.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E55642] hover:underline"
                >
                  {row.officialLabel} ↗
                </a>
              </dd>
            </div>
            {row.notes && (
              <div className="sm:col-span-2">
                <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80 mb-1">Note</dt>
                <dd className="text-foreground/80 leading-relaxed">{row.notes}</dd>
              </div>
            )}
          </dl>
        </div>
      ))}
    </div>
  );
}
