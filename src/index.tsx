import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "./config";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Could not find root element to mount to");

ReactDOM.createRoot(rootElement).render(
  <GoogleOAuthProvider clientId={config.googleClientId}>
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  </GoogleOAuthProvider>,
);