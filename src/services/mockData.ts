import type { Leak, LeakStatus, DetectorType } from "../types/leak";

const BRISTOL_STREETS = [
  "Temple Way, BS1",
  "Whiteladies Rd, BS8",
  "Gloucester Rd, BS7",
  "Bath Rd, BS4",
  "Coronation Rd, BS3",
  "Stapleton Rd, BS5",
  "Wells Rd, BS4",
  "Fishponds Rd, BS16",
  "Bedminster Parade, BS3",
  "Redcliffe Way, BS1",
  "Queen's Rd, BS8",
  "Stokes Croft, BS1",
  "Park St, BS1",
  "Anchor Rd, BS1",
  "Hotwells Rd, BS8",
  "Cumberland Rd, BS1",
  "Victoria St, BS1",
  "Baldwin St, BS1",
  "Broad Quay, BS1",
  "Marsh St, BS1",
];

const DETECTOR_TYPES: DetectorType[] = ["AMLD", "handheld", "fixed_sensor"];
const STATUSES: LeakStatus[] = ["detected", "investigating", "confirmed", "repaired"];

const randomFromArray = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateId = (): string => {
  const prefix = "BRS";
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}-${num}`;
};

const generateSurveyId = (): string => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `SV-${date.getFullYear()}${month}-${Math.floor(Math.random() * 900) + 100}`;
};

const createLeak = (overrides: Partial<Leak> = {}): Leak => {
  const severity = overrides.severity ?? Math.floor(Math.random() * 5) + 1;
  const concentration = severity * 14 + Math.floor(Math.random() * 10);
  return {
    id: generateId(),
    lat: 51.45 + (Math.random() - 0.5) * 0.03,
    lng: -2.59 + (Math.random() - 0.5) * 0.04,
    severity,
    timestamp: overrides.timestamp ?? new Date().toISOString(),
    concentration_ppb: concentration,
    flow_rate_gh: +(severity * 0.8 + Math.random() * 2).toFixed(1),
    address: randomFromArray(BRISTOL_STREETS),
    status: randomFromArray(STATUSES),
    detector_type: randomFromArray(DETECTOR_TYPES),
    survey_id: generateSurveyId(),
    ...overrides,
  };
};

export const initialLeaks: Leak[] = [
  createLeak({ id: "BRS-0001", lat: 51.4545, lng: -2.5879, severity: 5, status: "confirmed",   address: "Temple Way, BS1",       detector_type: "AMLD" }),
  createLeak({ id: "BRS-0002", lat: 51.4590, lng: -2.5950, severity: 3, status: "investigating", address: "Whiteladies Rd, BS8",   detector_type: "handheld" }),
  createLeak({ id: "BRS-0003", lat: 51.4610, lng: -2.5830, severity: 1, status: "detected",     address: "Gloucester Rd, BS7",     detector_type: "fixed_sensor" }),
  createLeak({ id: "BRS-0004", lat: 51.4480, lng: -2.5920, severity: 4, status: "investigating", address: "Bath Rd, BS4",           detector_type: "AMLD" }),
  createLeak({ id: "BRS-0005", lat: 51.4520, lng: -2.5800, severity: 2, status: "repaired",     address: "Victoria St, BS1",        detector_type: "handheld" }),
  createLeak({ id: "BRS-0006", lat: 51.4570, lng: -2.6000, severity: 5, status: "confirmed",    address: "Coronation Rd, BS3",      detector_type: "AMLD" }),
  createLeak({ id: "BRS-0007", lat: 51.4630, lng: -2.5780, severity: 1, status: "detected",     address: "Stokes Croft, BS1",       detector_type: "fixed_sensor" }),
  createLeak({ id: "BRS-0008", lat: 51.4500, lng: -2.5850, severity: 3, status: "investigating", address: "Redcliffe Way, BS1",     detector_type: "AMLD" }),
];

export const generateNewLeak = (): Leak => createLeak();
