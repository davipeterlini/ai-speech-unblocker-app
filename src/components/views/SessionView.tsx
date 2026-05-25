import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useToast } from "../../contexts/ToastContext";
import { Mic, Square, RefreshCw, MessageSquare } from "lucide-react";
import { BlockType, Severity } from "../../types";
import { DEFAULT_PROMPTS } from "../../constants";

export const SessionView: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [blockType, setBlockType] = useState<BlockType>(BlockType.MENTAL_BLOCK);
  const [severity, setSeverity] = useState<Severity>(Severity.MODERATE);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isInterpreting, setIsInterpreting] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const startSession = () => {
    setIsSessionActive(true);
    setSessionDuration(0);
    setCurrentPrompt(DEFAULT_PROMPTS[Math.floor(Math.random() * DEFAULT_PROMPTS.length)]);
    showToast("Sessao iniciada", "success");
  };

  const endSession = () => {
    setIsSessionActive(false);
    showToast("Sessao encerrada", "info");
  };

  const triggerIntervention = async () => {
    setIsInterpreting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCurrentPrompt(DEFAULT_PROMPTS[Math.floor(Math.random() * DEFAULT_PROMPTS.length)]);
    setIsInterpreting(false);
    showToast("Nova intervencao gerada", "success");
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{t("session")}</h2>
        {isSessionActive && (
          <span className="text-lg font-mono text-green-400">
            {formatDuration(sessionDuration)}
          </span>
        )}
      </div>

      {!isSessionActive ? (
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mic size={36} className="text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Ready to Start</h3>
          <p className="text-gray-400 mb-6">Configure your session type and begin</p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            <div>
              <label className="block text-sm text-gray-400 mb-2">{t("block_type")}</label>
              <select
                value={blockType}
                onChange={(e) => setBlockType(e.target.value as BlockType)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value={BlockType.MENTAL_BLOCK}>{t("mental_block")}</option>
                <option value={BlockType.STUTTER}>{t("stutter")}</option>
                <option value={BlockType.ANXIETY}>{t("anxiety")}</option>
                <option value={BlockType.FATIGUE}>{t("fatigue")}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">{t("severity")}</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as Severity)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value={Severity.MILD}>{t("mild")}</option>
                <option value={Severity.MODERATE}>{t("moderate")}</option>
                <option value={Severity.SEVERE}>{t("severe")}</option>
              </select>
            </div>
          </div>

          <button
            onClick={startSession}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            <Mic size={20} />
            {t("start_session")}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Current Block Type</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                {t("mental_block")}
              </span>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
              <p className="text-xl text-white text-center leading-relaxed">
                {isInterpreting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw size={20} className="animate-spin" />
                    AI is thinking...
                  </span>
                ) : (
                  currentPrompt
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={triggerIntervention}
              disabled={isInterpreting}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg font-medium transition-colors"
            >
              <RefreshCw size={20} className={isInterpreting ? "animate-spin" : ""} />
              New Intervention
            </button>
            <button
              onClick={endSession}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
            >
              <Square size={20} />
              {t("end_session")}
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare size={20} />
              Session Log
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Session started at {new Date().toLocaleTimeString()}</p>
              <p>Block type: {blockType}</p>
              <p>Severity: {severity}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};