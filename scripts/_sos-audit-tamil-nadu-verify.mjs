// Extract all landline/mobile numbers from the Tamil Nadu SOS data
// Landline: 0XXXX-XXXXXX or 0XXX-XXXXXXX (10-11 digits starting with 0)
// Mobile: 10-digit starting 6-9

const shortCodes = new Set([
  '100', '101', '102', '108', '112', '1070', '1077', '1091', '1090', '1100',
  '1554', '139', '1098', '181', '1095', '1930', '15500', '1907', '1363', '1364',
  '1100'
]);

function extractNumbers(text) {
  if (!text) return [];

  const numbers = [];

  // Extract landlines: 0XXXX-XXXXXX or 0XXX-XXXXXXX
  const landlinePattern = /0\d{3,4}-\d{5,7}/g;
  let match;
  while ((match = landlinePattern.exec(text)) !== null) {
    numbers.push({ raw: match[0], type: 'landline' });
  }

  // Extract 10-digit numbers (with or without formatting)
  const tenDigitPattern = /0\d{9}|\d{10}(?![\d-])/g;
  while ((match = tenDigitPattern.exec(text)) !== null) {
    const num = match[0];
    if (!shortCodes.has(num.replace(/^0/, ''))) {
      if (num.startsWith('0') && num.length === 10) {
        numbers.push({ raw: num, type: 'landline' });
      } else if (!num.startsWith('0') && [6,7,8,9].includes(parseInt(num[0]))) {
        numbers.push({ raw: num, type: 'mobile' });
      }
    }
  }

  // Extract 11-digit numbers (9XXXXXXXXX)
  const elevenDigitPattern = /[6-9]\d{9}/g;
  while ((match = elevenDigitPattern.exec(text)) !== null) {
    const num = match[0];
    if (num.length === 10 && [6,7,8,9].includes(parseInt(num[0]))) {
      numbers.push({ raw: num, type: 'mobile' });
    }
  }

  // Filter out duplicates and short codes
  return [...new Set(numbers.map(n => JSON.stringify(n)))].map(n => JSON.parse(n));
}

const data = [
  {
    destination_id: "palani",
    name: "Palani",
    rescue_contact: "Dindigul District Collectorate Control Room: 1077",
    nearest_hospital: "Government Hospital, Palani (Tel: 04545-240581)"
  },
  {
    destination_id: "pazhamudircholai",
    name: "Pazhamudircholai",
    nearest_hospital: "Government Rajaji Hospital, Madurai (Tel: 04522533230)"
  },
  {
    destination_id: "swamimalai",
    name: "Swamimalai",
    nearest_hospital: "Thanjavur Medical College Hospital (Tel: 04362-240822)"
  },
  {
    destination_id: "tiruchendur",
    name: "Tiruchendur",
    rescue_contact: "Thoothukudi District Collector's Office / Disaster Control Room: 0461-2340101",
    nearest_hospital: "Govt. Medical College Thoothukudi (Tel: 0461-2330094)"
  },
  {
    destination_id: "tiruparankundram",
    name: "Tiruparankundram",
    nearest_hospital: "Government Rajaji Hospital, Madurai (Tel: 04522533230)"
  },
  {
    destination_id: "kanyakumari",
    name: "Kanyakumari",
    rescue_contact: "Kanniyakumari District Disaster Centre: 1077 / 04652-231077",
    nearest_hospital: "Government Hospital, Kanniyakumari"
  },
  {
    destination_id: "tiruttani",
    name: "Tiruttani",
    rescue_contact: "Collectorate Disaster Control Room, Ranipet District: 1077",
    nearest_hospital: "Government Head Quarters Hospital, Walajah (Tel: 04172-232538)"
  },
  {
    destination_id: "tiruvannamalai",
    name: "Tiruvannamalai",
    rescue_contact: "Tiruvannamalai District Disaster Management Control Room: 04175-232260",
    nearest_hospital: "Government Tiruvannamalai Medical College and Hospital (Tel: 04175-233315)"
  },
  {
    destination_id: "vedanthangal",
    name: "Vedanthangal",
    rescue_contact: "Chengalpattu Disaster Helpline: 1077 / 044-27427412 / 27427414",
    nearest_hospital: "Government Hospital, Madhuranthakam (Madhuranagam)"
  },
  {
    destination_id: "trichy",
    name: "Trichy",
    rescue_contact: "Trichy Disaster Helpline: 1077 / Collectorate Board: 0431-2415031, 2415032, 2415033",
    nearest_hospital: "Annal Gandhi Memorial Government Hospital, Trichy (MGMGH)"
  },
  {
    destination_id: "kanchipuram",
    name: "Kanchipuram",
    rescue_contact: "Kancheepuram Disaster Helpline: 1077 / 044-27237107",
    nearest_hospital: "Government Head Quarters Hospital, Kancheepuram"
  },
  {
    destination_id: "mahabalipuram",
    name: "Mahabalipuram",
    rescue_contact: "Chengalpattu Disaster Helpline: 1077 / 044-27427412 / 27427414",
    nearest_hospital: "Government Hospital, Chengalpattu (Chengalpattu Medical College Hospital)"
  },
  {
    destination_id: "thanjavur",
    name: "Thanjavur",
    rescue_contact: "Thanjavur Disaster Helpline: 1077 (Collectorate Control Room) / Collectorate Board: 04362-230121, 230122",
    nearest_hospital: "Thanjavur Medical College Hospital (TMCH)"
  },
  {
    destination_id: "kumbakonam",
    name: "Kumbakonam",
    rescue_contact: "Thanjavur Disaster Helpline: 1077 / RDO Kumbakonam: 0435-2430101 / 9445000466",
    nearest_hospital: "Government District Headquarters Hospital, Kumbakonam"
  },
  {
    destination_id: "yercaud",
    name: "Yercaud",
    rescue_contact: "Salem Disaster Helpline: 1077 / Collectorate Board: 0427-2450301, 2450302, 2450303",
    nearest_hospital: "Government Mohan Kumaramangalam Medical College Hospital, Salem (GMKMCH)"
  },
  {
    destination_id: "ooty",
    name: "Ooty",
    rescue_contact: "Nilgiris Disaster Helpline: 1077 / 'At your Service' WhatsApp 9943126000",
    nearest_hospital: "Government Hospital, Ooty (Govt Headquarters Hospital Udhagamandalam)"
  },
  {
    destination_id: "point-calimere",
    name: "Point Calimere",
    rescue_contact: "Nagapattinam Disaster Helpline: 1077 / Collectorate Board: 04365-253000, 252500, 253082",
    nearest_hospital: "Government Hospital, Vedaranyam"
  },
  {
    destination_id: "chettinad",
    name: "Chettinad",
    rescue_contact: "Sivaganga Disaster Helpline: 1077 / SMS-WhatsApp 8903331077 / Collectorate Board 04575-240391",
    nearest_hospital: "Government Hospital, Karaikudi (Government Head Hospital)"
  }
];

// Extract all numbers
const extraction = [];
data.forEach(row => {
  ['rescue_contact', 'mountain_rescue', 'nearest_hospital'].forEach(col => {
    const text = row[col];
    if (text) {
      const numbers = extractNumbers(text);
      numbers.forEach(num => {
        extraction.push({
          destination_id: row.destination_id,
          column: col,
          raw_text: text,
          number: num.raw,
          type: num.type,
          claims: extractClaim(text, num.raw)
        });
      });
    }
  });
});

function extractClaim(text, number) {
  // Extract the institution name from the text
  const beforeNumber = text.substring(0, text.indexOf(number));
  const parts = beforeNumber.split(/[:\/]/).reverse();
  return (parts[0] || text).trim();
}

console.log('Extracted Numbers:');
console.log(JSON.stringify(extraction, null, 2));
