export type LeakStatus = "detected" | "investigating" | "confirmed" | "repaired";
export type DetectorType = "AMLD" | "handheld" | "fixed_sensor";
export type SeverityLevel = "nominal" | "review" | "action";

export interface Leak {
  id: string;
  lat: number;
  lng: number;
  severity: number;
  timestamp: string;
  concentration_ppb: number;
  flow_rate_gh: number;
  address: string;
  status: LeakStatus;
  detector_type: DetectorType;
  survey_id: string;
}

export const getSeverityLevel = (severity: number): SeverityLevel => {
  if (severity <= 2) return "nominal";
  if (severity <= 4) return "review";
  return "action";
};

export const getSeverityConfig = (severity: number) => {
  const level = getSeverityLevel(severity);
  const configs = {
    nominal: { label: "Nominal", color: "#059669", bg: "#05966915", border: "#05966930" },
    review:  { label: "Review",  color: "#d97706", bg: "#d9770615", border: "#d9770630" },
    action:  { label: "Action",  color: "#dc2626", bg: "#dc262615", border: "#dc262630" },
  };
  return configs[level];
};
