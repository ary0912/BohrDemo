import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ControlPanel from "./ControlPanel";

describe("ControlPanel", () => {
  it("renders all filter buttons", () => {
    render(
      <ControlPanel onOpenAbout={vi.fn()} activeFilter={null} onFilterChange={vi.fn()} />
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
    expect(screen.getByText("Nominal")).toBeInTheDocument();
  });

  it("calls onFilterChange with severity 5 when Action is clicked", () => {
    const onFilterChange = vi.fn();
    render(
      <ControlPanel onOpenAbout={vi.fn()} activeFilter={null} onFilterChange={onFilterChange} />
    );

    fireEvent.click(screen.getByText("Action"));
    expect(onFilterChange).toHaveBeenCalledWith(5);
  });

  it("calls onFilterChange with null when All is clicked", () => {
    const onFilterChange = vi.fn();
    render(
      <ControlPanel onOpenAbout={vi.fn()} activeFilter={5} onFilterChange={onFilterChange} />
    );

    fireEvent.click(screen.getByText("All"));
    expect(onFilterChange).toHaveBeenCalledWith(null);
  });

  it("calls onOpenAbout when info button is clicked", () => {
    const onOpenAbout = vi.fn();
    render(
      <ControlPanel onOpenAbout={onOpenAbout} activeFilter={null} onFilterChange={vi.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: /system information/i }));
    expect(onOpenAbout).toHaveBeenCalledTimes(1);
  });

  it("marks active filter with aria-pressed", () => {
    render(
      <ControlPanel onOpenAbout={vi.fn()} activeFilter={null} onFilterChange={vi.fn()} />
    );

    const allBtn = screen.getByRole("button", { name: "All" });
    expect(allBtn).toHaveAttribute("aria-pressed", "true");

    const actionBtn = screen.getByRole("button", { name: "Action" });
    expect(actionBtn).toHaveAttribute("aria-pressed", "false");
  });
});
