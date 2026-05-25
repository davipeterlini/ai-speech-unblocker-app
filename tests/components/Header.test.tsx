import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "../utils/test-utils";
import { Header } from "../../src/components/layout/Header";
import { Sidebar } from "../../src/components/layout/Sidebar";

// Mock the contexts at the top level
const mockAuthContext = {
  user: null,
  isLoading: false,
  signIn: vi.fn(),
  signOut: vi.fn(),
};

vi.mock("../../src/contexts/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => mockAuthContext,
}));

vi.mock("../../src/contexts/LanguageContext", () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => children,
  useLanguage: () => ({
    language: "pt-BR" as const,
    setLanguage: vi.fn(),
    t: (key: string) => {
      const translations: Record<string, string> = {
        home: "Inicio",
        session: "Sessao",
        history: "Historico",
        settings: "Configuracoes",
        sign_out: "Sair",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the app name", () => {
    render(<Header />);
    expect(screen.getByText(/AI Speech Unblocker/i)).toBeInTheDocument();
  });
});

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders navigation items", () => {
    render(<Sidebar currentView="home" onViewChange={() => {}} />);
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  });

  it("calls onViewChange when clicking a nav item", () => {
    const mockOnViewChange = vi.fn();
    render(<Sidebar currentView="home" onViewChange={mockOnViewChange} />);

    const sessionButton = screen.getByText(/Sessao/i);
    sessionButton.click();
    expect(mockOnViewChange).toHaveBeenCalledWith("session");
  });

  it("highlights the current view", () => {
    render(<Sidebar currentView="session" onViewChange={() => {}} />);
    const sessionButton = screen.getByText(/Sessao/i);
    expect(sessionButton.closest("button")).toHaveClass("bg-blue-600");
  });
});