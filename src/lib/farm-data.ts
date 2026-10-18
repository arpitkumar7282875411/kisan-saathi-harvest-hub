export type MspRow = { crop: string; season: "Kharif 2025-26" | "Rabi 2026-27"; msp: number; group: string };

// Minimum Support Prices (₹ per quintal) as announced by Government of India (CACP).
export const MSP: MspRow[] = [
  { crop: "Paddy (Common)", season: "Kharif 2025-26", msp: 2369, group: "Cereals" },
  { crop: "Paddy (Grade A)", season: "Kharif 2025-26", msp: 2389, group: "Cereals" },
  { crop: "Jowar (Hybrid)", season: "Kharif 2025-26", msp: 3699, group: "Cereals" },
  { crop: "Jowar (Maldandi)", season: "Kharif 2025-26", msp: 3749, group: "Cereals" },
  { crop: "Bajra", season: "Kharif 2025-26", msp: 2775, group: "Cereals" },
  { crop: "Ragi", season: "Kharif 2025-26", msp: 4886, group: "Cereals" },
  { crop: "Maize", season: "Kharif 2025-26", msp: 2400, group: "Cereals" },
  { crop: "Tur / Arhar", season: "Kharif 2025-26", msp: 8000, group: "Pulses" },
  { crop: "Moong", season: "Kharif 2025-26", msp: 8768, group: "Pulses" },
  { crop: "Urad", season: "Kharif 2025-26", msp: 7800, group: "Pulses" },
  { crop: "Groundnut", season: "Kharif 2025-26", msp: 7263, group: "Oilseeds" },
  { crop: "Sunflower Seed", season: "Kharif 2025-26", msp: 7721, group: "Oilseeds" },
  { crop: "Soybean (Yellow)", season: "Kharif 2025-26", msp: 5328, group: "Oilseeds" },
  { crop: "Sesamum", season: "Kharif 2025-26", msp: 9846, group: "Oilseeds" },
  { crop: "Nigerseed", season: "Kharif 2025-26", msp: 9537, group: "Oilseeds" },
  { crop: "Cotton (Medium Staple)", season: "Kharif 2025-26", msp: 7710, group: "Fibre" },
  { crop: "Cotton (Long Staple)", season: "Kharif 2025-26", msp: 8110, group: "Fibre" },
  { crop: "Wheat", season: "Rabi 2026-27", msp: 2585, group: "Cereals" },
  { crop: "Barley", season: "Rabi 2026-27", msp: 2150, group: "Cereals" },
  { crop: "Gram (Chana)", season: "Rabi 2026-27", msp: 5875, group: "Pulses" },
  { crop: "Masur (Lentil)", season: "Rabi 2026-27", msp: 7000, group: "Pulses" },
  { crop: "Rapeseed & Mustard", season: "Rabi 2026-27", msp: 6200, group: "Oilseeds" },
  { crop: "Safflower", season: "Rabi 2026-27", msp: 6540, group: "Oilseeds" },
];

export type Scheme = { name: string; short: string; benefit: string; who: string; how: string; link: string };

export const SCHEMES: Scheme[] = [
  { name: "PM-KISAN", short: "Income support", benefit: "₹6,000 per year in 3 instalments of ₹2,000 directly to bank account.", who: "All land-holding farmer families.", how: "Register at pmkisan.gov.in or CSC centre. Complete e-KYC.", link: "https://pmkisan.gov.in" },
  { name: "PM Fasal Bima Yojana", short: "Crop insurance", benefit: "Insurance against crop loss. Farmer pays only 2% (Kharif), 1.5% (Rabi), 5% (commercial).", who: "All farmers incl. tenant farmers.", how: "Apply via bank, CSC or pmfby.gov.in before the cut-off date.", link: "https://pmfby.gov.in" },
  { name: "Kisan Credit Card (KCC)", short: "Cheap crop loans", benefit: "Loans up to ₹3 lakh at 7% interest; 3% extra subsidy on timely repayment (effective 4%).", who: "Farmers, fishers, animal husbandry farmers.", how: "Apply at any bank branch with land papers and Aadhaar.", link: "https://www.myscheme.gov.in/schemes/kcc" },
  { name: "Soil Health Card", short: "Free soil testing", benefit: "Free soil test with crop-wise fertilizer advice.", who: "All farmers.", how: "Contact local agriculture office or soilhealth.dac.gov.in.", link: "https://soilhealth.dac.gov.in" },
  { name: "PM-KUSUM", short: "Solar pumps", benefit: "Up to 60% subsidy on solar irrigation pumps; sell extra power to grid.", who: "Individual farmers, groups, FPOs.", how: "Apply on your state renewable energy agency portal.", link: "https://pmkusum.mnre.gov.in" },
  { name: "PM Krishi Sinchayee Yojana", short: "Drip & sprinkler", benefit: "55% subsidy (small farmers) / 45% (others) on micro-irrigation.", who: "All farmers with water source.", how: "Apply through state horticulture/agriculture department.", link: "https://pmksy.gov.in" },
  { name: "e-NAM", short: "Online mandi", benefit: "Sell produce online across mandis for better prices.", who: "Farmers, FPOs, traders.", how: "Register at enam.gov.in or at an e-NAM mandi.", link: "https://enam.gov.in" },
  { name: "Agriculture Infrastructure Fund", short: "Warehouse loans", benefit: "3% interest subvention on loans up to ₹2 crore for storage, cold chain.", who: "Farmers, FPOs, agri-entrepreneurs.", how: "Apply at agriinfra.dac.gov.in.", link: "https://agriinfra.dac.gov.in" },
  { name: "Paramparagat Krishi Vikas Yojana", short: "Organic farming", benefit: "₹31,500 per hectare over 3 years for organic farming.", who: "Farmer clusters/groups.", how: "Contact district agriculture office.", link: "https://pgsindia-ncof.gov.in" },
  { name: "SMAM (Farm Machinery)", short: "Machine subsidy", benefit: "40–50% subsidy on tractors, tillers and farm tools; custom hiring centres.", who: "All farmers, extra for SC/ST, women, small farmers.", how: "Apply at agrimachinery.nic.in.", link: "https://agrimachinery.nic.in" },
];

export type Mandi = { crop: string; mandi: string; state: string; min: number; max: number; modal: number; trend: "up" | "down" | "flat" };

// Indicative mandi rates (₹/quintal) — sample data for illustration.
export const MANDI: Mandi[] = [
  { crop: "Wheat", mandi: "Khanna", state: "Punjab", min: 2450, max: 2620, modal: 2550, trend: "up" },
  { crop: "Paddy", mandi: "Karnal", state: "Haryana", min: 2300, max: 2500, modal: 2380, trend: "flat" },
  { crop: "Onion", mandi: "Lasalgaon", state: "Maharashtra", min: 1600, max: 2600, modal: 2200, trend: "down" },
  { crop: "Tomato", mandi: "Kolar", state: "Karnataka", min: 900, max: 1900, modal: 1400, trend: "up" },
  { crop: "Potato", mandi: "Agra", state: "Uttar Pradesh", min: 1100, max: 1500, modal: 1300, trend: "flat" },
  { crop: "Soybean", mandi: "Indore", state: "Madhya Pradesh", min: 4600, max: 5200, modal: 4950, trend: "up" },
  { crop: "Cotton", mandi: "Rajkot", state: "Gujarat", min: 7200, max: 7900, modal: 7600, trend: "flat" },
  { crop: "Chilli (Teja)", mandi: "Guntur", state: "Andhra Pradesh", min: 15000, max: 19500, modal: 18000, trend: "up" },
  { crop: "Mustard", mandi: "Alwar", state: "Rajasthan", min: 5900, max: 6400, modal: 6150, trend: "down" },
  { crop: "Gram", mandi: "Bikaner", state: "Rajasthan", min: 5600, max: 6000, modal: 5800, trend: "flat" },
  { crop: "Maize", mandi: "Davangere", state: "Karnataka", min: 2100, max: 2350, modal: 2250, trend: "up" },
  { crop: "Turmeric", mandi: "Nizamabad", state: "Telangana", min: 11000, max: 14500, modal: 13200, trend: "down" },
];

export type NewsItem = { title: string; summary: string; tag: string; date: string; source: string; link: string };

export const NEWS: NewsItem[] = [
  { title: "Rabi MSP raised: wheat now ₹2,585 per quintal", summary: "Government increased MSP of all mandated Rabi crops for marketing season 2026-27. Safflower and lentil got the biggest hike.", tag: "MSP", date: "Oct 2025", source: "PIB Agriculture", link: "https://pib.gov.in" },
  { title: "Rabi sowing advisory: sow wheat between 1–25 November", summary: "ICAR advises timely sowing of wheat with seed treatment to avoid termite and loose smut. Use heat-tolerant varieties.", tag: "Advisory", date: "This week", source: "ICAR", link: "https://icar.org.in" },
  { title: "PM-KISAN: complete e-KYC to get next instalment", summary: "Farmers without completed e-KYC and land seeding may not receive the next ₹2,000 instalment. Use OTP or face authentication app.", tag: "Scheme", date: "This month", source: "PM-KISAN", link: "https://pmkisan.gov.in" },
  { title: "Last date for Rabi crop insurance approaching", summary: "Farmers can enrol under PMFBY for Rabi crops by 31 December in most states. Loanee farmers are enrolled automatically unless they opt out.", tag: "Insurance", date: "Upcoming", source: "PMFBY", link: "https://pmfby.gov.in" },
  { title: "Stubble burning: get free machines from custom hiring centres", summary: "Happy Seeder and Super SMS machines available at subsidised rent in Punjab, Haryana, UP. Bio-decomposer spray is a cheap alternative.", tag: "Environment", date: "This week", source: "Agri Dept.", link: "https://agrimachinery.nic.in" },
  { title: "Weather: light rain likely in north-west India", summary: "IMD forecasts light rain and cooler nights. Delay irrigation and pesticide spray if rain is expected within 24 hours.", tag: "Weather", date: "Next 5 days", source: "IMD", link: "https://mausam.imd.gov.in" },
];

export const IRRIGATION_CROPS = [
  { crop: "Wheat", mmPerDay: 4, interval: "20–25 days", critical: "Crown root (21 days), flowering, grain filling" },
  { crop: "Paddy", mmPerDay: 8, interval: "Keep 2–5 cm standing water", critical: "Tillering, flowering" },
  { crop: "Maize", mmPerDay: 5, interval: "10–12 days", critical: "Tasseling and silking" },
  { crop: "Cotton", mmPerDay: 5, interval: "12–15 days", critical: "Flowering, boll formation" },
  { crop: "Sugarcane", mmPerDay: 6, interval: "8–10 days (summer)", critical: "Tillering, grand growth" },
  { crop: "Vegetables", mmPerDay: 5, interval: "4–7 days", critical: "Flowering and fruiting" },
  { crop: "Pulses", mmPerDay: 3, interval: "Only if dry, 1–2 times", critical: "Flowering, pod filling" },
];

export const SOIL_FACTOR: Record<string, number> = { Sandy: 1.25, Loamy: 1, Clay: 0.85 };
export const METHOD_EFF: Record<string, number> = { Flood: 0.6, Sprinkler: 0.75, Drip: 0.9 };

/** Litres of water needed per day for a field. 1 mm over 1 acre = 4047 L. */
export function waterNeedLitres(acres: number, mmPerDay: number, soil: string, method: string) {
  const net = acres * mmPerDay * 4047 * (SOIL_FACTOR[soil] ?? 1);
  return Math.round(net / (METHOD_EFF[method] ?? 0.6));
}
