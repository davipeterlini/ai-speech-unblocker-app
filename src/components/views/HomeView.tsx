import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { Mic, TrendingUp, Calendar, Award } from "lucide-react";
import { BlockType } from "../../types";

export const HomeView: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = {
    totalSessions: 24,
    avgDuration: "4.2 min",
    mostCommon: "Mental Block",
    streak: 7,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {t("welcome")}, {user?.name?.split(" ")[0]}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Mic size={20} />}
          label={t("total_sessions")}
          value={stats.totalSessions.toString()}
          color="blue"
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label={t("avg_duration")}
          value={stats.avgDuration}
          color="green"
        />
        <StatCard
          icon={<Calendar size={20} />}
          label={t("common_block")}
          value={stats.mostCommon}
          color="purple"
        />
        <StatCard
          icon={<Award size={20} />}
          label={t("streak")}
          value={`${stats.streak} dias`}
          color="orange"
        />
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Mic size={24} />
            <span className="font-medium">{t("start_voice_session")}</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <Calendar size={24} />
            <span className="font-medium">{t("view_history")}</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Mic size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Mental Block Session</p>
                <p className="text-gray-400 text-sm">Today at 2:30 PM</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">5 min</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Mic size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">Anxiety Session</p>
                <p className="text-gray-400 text-sm">Yesterday at 10:15 AM</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">3 min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "blue" | "green" | "purple" | "orange";
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  const colorClasses = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    purple: "bg-purple-500/20 text-purple-400",
    orange: "bg-orange-500/20 text-orange-400",
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorClasses[color]}`}>
        {icon}
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};