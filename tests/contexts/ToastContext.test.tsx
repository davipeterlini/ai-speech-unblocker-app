import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "../utils/test-utils";
import { useToast } from "../../src/contexts/ToastContext";

const TestConsumer: React.FC = () => {
  const { showToast } = useToast();
  return <button onClick={() => showToast("Test message", "success")}>Show Toast</button>;
};

describe("ToastContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays toast when showToast is called", async () => {
    render(<TestConsumer />);

    await act(async () => {
      fireEvent.click(screen.getByText("Show Toast"));
    });

    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("removes toast after timeout", async () => {
    vi.useFakeTimers();
    render(<TestConsumer />);

    fireEvent.click(screen.getByText("Show Toast"));
    expect(screen.getByText("Test message")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(3500);
    });

    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});