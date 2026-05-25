import React from "react";
import { Home, Mic, History, Settings } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { APP_NAME } from "../../constants";
import type { View } from "../../types";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: "home" as View, label: t("home"), icon: Home },
    { id: "session" as View, label: t("session"), icon: Mic },
    { id: "history" as View, label: t("history"), icon: History },
    { id: "settings" as View, label: t("settings"), icon: Settings },
  ];

  return (
    <aside className="w-16 md:w-56 bg-gray-800 border-r border-gray-700 flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-gray-700">
        <span className="hidden md:block font-bold text-white">{APP_NAME}</span>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentView === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <item.icon size={18} />
            <span className="hidden md:block">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};