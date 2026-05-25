import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Mic, Sparkles, CalendarCheck, Target } from "lucide-react";
import { APP_NAME, APP_VERSION } from "../../constants";

export const LoginScreen: React.FC = () => {
  const { signIn, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f172a]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] opacity-80" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
        <svg width="800" height="800" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div
          className={`w-full max-w-[420px] transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/50 via-violet-500/50 to-blue-500/50 rounded-[1.875rem] opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-500" />

            <div className="relative bg-white/[0.03] backdrop-blur-2xl rounded-[1.875rem] border border-white/[0.08] p-10 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl" />
                    <div className="relative bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl p-4 shadow-lg shadow-blue-500/25">
                      <Mic size={28} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-10">
                  <h1
                    className="text-3xl font-bold text-white mb-3 tracking-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {APP_NAME}
                  </h1>
                  <p
                    className="text-white/50 text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Break through speech blocks with AI assistance
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-10">
                  <FeatureItem icon={<SparklesIcon />} text="AI Prompts" />
                  <FeatureItem icon={<CalendarCheckIcon />} text="Sessions" />
                  <FeatureItem icon={<TargetIcon />} text="Progress" />
                </div>

                <button
                  onClick={() => signIn()}
                  disabled={isLoading}
                  className="group relative w-full overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#6777F8] to-[#8B5CF6]" />
                  <div className="absolute inset-[1px] bg-gradient-to-r from-[#4285F4] via-[#6777F8] to-[#8B5CF6] rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-white/[0.15] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex items-center justify-center gap-3 py-4 px-6">
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        <span className="text-white font-semibold">Entrando...</span>
                      </>
                    ) : (
                      <>
                        <GoogleIcon />
                        <span
                          className="text-white font-semibold tracking-wide"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Entrar com Google
                        </span>
                      </>
                    )}
                  </div>
                </button>

                <p
                  className="text-center text-white/30 text-xs mt-8"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Ao continuar, voce aceita nossos{' '}
                  <button className="text-white/50 hover:text-white/70 underline underline-offset-2 transition-colors">
                    Termos de Uso
                  </button>{' '}e{' '}
                  <button className="text-white/50 hover:text-white/70 underline underline-offset-2 transition-colors">
                    Politica de Privacidade
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <span className="text-white/20 text-xs font-mono">v{APP_VERSION}</span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

const FeatureItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors">
    <div className="text-white/60">{icon}</div>
    <span className="text-white/60 text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {text}
    </span>
  </div>
);

const SparklesIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.272 1.272L21 12l-5.813 1.912a2 2 0 00-1.272 1.272L12 21l-1.912-5.813a2 2 0 00-1.272-1.272L3 12l5.813-1.912a2 2 0 001.272-1.272L12 3z" />
  </svg>
);

const CalendarCheckIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M9 16l2 2 4-4" />
  </svg>
);

const TargetIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const GoogleIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    <path fill="none" d="M0 0h48v48H0z" />
  </svg>
);