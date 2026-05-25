import "@testing-library/jest-dom";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Mock Google OAuth Provider
vi.mock("@react-oauth/google", () => ({
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useGoogleLogin: () => vi.fn(),
  googleLogout: vi.fn(),
}));

// Mock AuthContext
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

// Mock LanguageContext
const mockLanguageContext = {
  language: "pt-BR" as const,
  setLanguage: vi.fn(),
  t: (key: string) => key,
};

vi.mock("../../src/contexts/LanguageContext", () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => children,
  useLanguage: () => mockLanguageContext,
}));

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
  vi.clearAllMocks();
});

vi.stubEnv("APP_VERSION", "0.1.0");
vi.stubEnv("VITE_GOOGLE_CLIENT_ID", "test-client-id");

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.IntersectionObserver = class {
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

global.ResizeObserver = class {
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;