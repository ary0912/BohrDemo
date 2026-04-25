import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LeakTable from "./LeakTable";
import type { Leak } from "../../types/leak";

const createMockLeak = (overrides: Partial<Leak> = {}): Leak => ({
  id: "BRS-0001",
  lat: 51.4545,
  lng: -2.5879,
  severity: 3,
  timestamp: new Date().toISOString(),
  concentration_ppb: 42,
  flow_rate_gh: 2.4,
  address: "Temple Way, BS1",
  status: "detected",
  detector_type: "AMLD",
  survey_id: "SV-202504-001",
  ...overrides,
});

describe("LeakTable", () => {
  it("renders empty state when no leaks are provided", () => {
    render(<LeakTable leaks={[]} />);
    expect(screen.getByText(/Awaiting detections/i)).toBeInTheDocument();
  });

  it("renders leak rows with correct IDs", () => {
    const leaks = [
      createMockLeak({ id: "BRS-1001", severity: 5, status: "confirmed" }),
      createMockLeak({ id: "BRS-1002", severity: 2, status: "detected" }),
    ];
    render(<LeakTable leaks={leaks} />);

    expect(screen.getByText("BRS-1001")).toBeInTheDocument();
    expect(screen.getByText("BRS-1002")).toBeInTheDocument();
  });

  it("renders status badges", () => {
    const leaks = [
      createMockLeak({ id: "BRS-2001", status: "confirmed" }),
      createMockLeak({ id: "BRS-2002", status: "detected" }),
    ];
    render(<LeakTable leaks={leaks} />);

    expect(screen.getByText("confirmed")).toBeInTheDocument();
    expect(screen.getByText("detected")).toBeInTheDocument();
  });

  it("displays concentration values", () => {
    const leaks = [createMockLeak({ concentration_ppb: 78 })];
    render(<LeakTable leaks={leaks} />);

    expect(screen.getByText("78")).toBeInTheDocument();
  });

  it("shows record count", () => {
    const leaks = [
      createMockLeak({ id: "BRS-3001" }),
      createMockLeak({ id: "BRS-3002" }),
      createMockLeak({ id: "BRS-3003" }),
    ];
    render(<LeakTable leaks={leaks} />);

    expect(screen.getByText("3 records")).toBeInTheDocument();
  });
});
