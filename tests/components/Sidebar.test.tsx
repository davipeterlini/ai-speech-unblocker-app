import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../utils/test-utils";
import { Sidebar } from "../../src/components/layout/Sidebar";
import type { View } from "../../src/types";

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders navigation items", () => {
    render(<Sidebar currentView="home" onViewChange={() => {}} />);
    expect(screen.getByText(/inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/session/i)).toBeInTheDocument();
    expect(screen.getByText(/historico/i)).toBeInTheDocument();
    expect(screen.getByText(/configuracoes/i)).toBeInTheDocument();
  });

  it("calls onViewChange when clicking a nav item", () => {
    const mockOnViewChange = vi.fn();
    render(<Sidebar currentView="home" onViewChange={mockOnViewChange} />);

    const sessionButton = screen.getByText(/session/i);
    sessionButton.click();
    expect(mockOnViewChange).toHaveBeenCalledWith("session");
  });

  it("highlights the current view", () => {
    render(<Sidebar currentView="session" onViewChange={() => {}} />);
    const sessionButton = screen.getByText(/session/i);
    expect(sessionButton.closest("button")).toHaveClass("bg-blue-600");
  });
});