import type { Leak } from "../types/leak";

export const initialLeaks: Leak[] = [
  {
    id: "1",
    lat: 51.4545,
    lng: -2.5879,
    severity: 3,
    timestamp: new Date().toISOString(),
  },
];

export const generateNewLeak = (): Leak => ({
  id: Math.random().toString(36).substring(2),
  lat: 51.45 + Math.random() * 0.02,
  lng: -2.58 + Math.random() * 0.02,
  severity: Math.floor(Math.random() * 5) + 1,
  timestamp: new Date().toISOString(),
});