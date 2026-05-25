import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useLocalStorage } from "../../src/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns default value when key does not exist", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("persists value in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", ""));

    act(() => {
      result.current[1]("novo valor");
    });

    expect(result.current[0]).toBe("novo valor");
    expect(localStorage.getItem("test-key")).toBe('"novo valor"');
  });
});