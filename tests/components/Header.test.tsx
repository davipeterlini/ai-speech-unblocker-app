import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../utils/test-utils";
import { Header } from "../../src/components/layout/Header";

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the app name", () => {
    render(<Header />);
    expect(screen.getByText(/AI Speech Unblocker/i)).toBeInTheDocument();
  });

  it("shows user email when authenticated", () => {
    vi.mock("../../src/contexts/AuthContext", () => ({
      useAuth: () => ({
        user: { id: "1", name: "Test User", email: "test@example.com", accessToken: "token" },
        signOut: vi.fn(),
        isLoading: false,
      }),
    }));

    render(<Header />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("calls signOut when clicking the button", () => {
    const mockSignOut = vi.fn();
    vi.mock("../../src/contexts/AuthContext", () => ({
      useAuth: () => ({
        user: { id: "1", name: "Test User", email: "test@test.com", accessToken: "token" },
        signOut: mockSignOut,
        isLoading: false,
      }),
    }));

    render(<Header />);
    const signOutButton = screen.getByText(/sair/i);
    signOutButton.click();
    expect(mockSignOut).toHaveBeenCalledOnce();
  });
});