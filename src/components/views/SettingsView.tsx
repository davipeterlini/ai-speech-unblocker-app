import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { User, Bell, Shield, Palette } from "lucide-react";

export const SettingsView: React.FC = () => {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">{t("settings")}</h2>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <User size={20} />
            Profile
          </h3>
        </div>
        <div className="p-4">
          {user && (
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.name}
                className="w-16 h-16 rounded-full bg-gray-700"
              />
              <div>
                <p className="text-white font-medium text-lg">{user.name}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>
          )}
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Bell size={20} />
            Notifications
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Session Reminders</p>
              <p className="text-gray-400 text-sm">Get reminded to practice daily</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">AI Prompts</p>
              <p className="text-gray-400 text-sm">Receive personalized AI suggestions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Palette size={20} />
            Appearance
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "pt-BR" | "en")}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="pt-BR">Portugues (BR)</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield size={20} />
            Privacy & Security
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <button className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <p className="text-white font-medium">Export My Data</p>
            <p className="text-gray-400 text-sm">Download all your session history</p>
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <p className="text-white font-medium">Delete Account</p>
            <p className="text-gray-400 text-sm">Permanently remove all your data</p>
          </button>
        </div>
      </div>
    </div>
  );
};