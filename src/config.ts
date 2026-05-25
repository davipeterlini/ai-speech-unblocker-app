export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
  googleClientId:
    (window as any).__ENV__?.VITE_GOOGLE_CLIENT_ID ||
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    "",
  environment: (window as any).__ENV__?.ENVIRONMENT || "development",
  appVersion: import.meta.env.APP_VERSION || "0.1.0",
};