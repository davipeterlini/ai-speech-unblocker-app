import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../utils/test-utils";
import { Sidebar } from "../../src/components/layout/Sidebar";

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

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders navigation items", () => {
    render(<Sidebar currentView="home" onViewChange={() => {}} />);
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Sessao/i)).toBeInTheDocument();
    expect(screen.getByText(/Historico/i)).toBeInTheDocument();
    expect(screen.getByText(/Configuracoes/i)).toBeInTheDocument();
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