import React, { createContext, useContext, useState, useCallback } from "react";

type Language = "pt-BR" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  "pt-BR": {
    app_name: "Desbloqueador de Fala IA",
    home: "Inicio",
    session: "Sessao",
    history: "Historico",
    settings: "Configuracoes",
    start_session: "Iniciar Sessao",
    end_session: "Encerrar Sessao",
    block_type: "Tipo de Bloqueio",
    severity: "Severidade",
    mental_block: "Bloqueio Mental",
    stutter: "Gagueira",
    anxiety: "Ansiedade",
    fatigue: "Fadiga",
    mild: "Leve",
    moderate: "Moderado",
    severe: "Severo",
    sign_in: "Entrar com Google",
    sign_out: "Sair",
    welcome: "Bem-vindo",
    start_voice_session: "Iniciar Sessao de Voz",
    view_history: "Ver Historico",
    your_stats: "Suas Estatisticas",
    total_sessions: "Total de Sessoes",
    avg_duration: "Duracao Media",
    common_block: "Bloqueio Mais Comum",
    streak: "Dias de Sequencia",
  },
  en: {
    app_name: "AI Speech Unblocker",
    home: "Home",
    session: "Session",
    history: "History",
    settings: "Settings",
    start_session: "Start Session",
    end_session: "End Session",
    block_type: "Block Type",
    severity: "Severity",
    mental_block: "Mental Block",
    stutter: "Stutter",
    anxiety: "Anxiety",
    fatigue: "Fatigue",
    mild: "Mild",
    moderate: "Moderate",
    severe: "Severe",
    sign_in: "Sign in with Google",
    sign_out: "Sign Out",
    welcome: "Welcome",
    start_voice_session: "Start Voice Session",
    view_history: "View History",
    your_stats: "Your Stats",
    total_sessions: "Total Sessions",
    avg_duration: "Average Duration",
    common_block: "Most Common Block",
    streak: "Day Streak",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("pt-BR");

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || key;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};