import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { APP_NAME } from "../../constants";

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <header className="h-14 bg-gray-800 border-b border-gray-700 flex items-center px-6 justify-between flex-shrink-0">
      <h1 className="text-lg font-semibold text-white">{APP_NAME}</h1>
      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{user.email}</span>
          <button
            onClick={signOut}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            {t("sign_out")}
          </button>
        </div>
      )}
    </header>
  );
};