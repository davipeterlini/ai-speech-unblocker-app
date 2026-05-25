import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Mic, Clock, TrendingUp } from "lucide-react";
import { BlockType } from "../../types";

interface SessionHistory {
  id: string;
  date: Date;
  duration: number;
  blockType: BlockType;
  interventionsCount: number;
}

export const HistoryView: React.FC = () => {
  const { t } = useLanguage();

  const sessions: SessionHistory[] = [
    {
      id: "1",
      date: new Date("2024-01-15T14:30:00"),
      duration: 5,
      blockType: BlockType.MENTAL_BLOCK,
      interventionsCount: 3,
    },
    {
      id: "2",
      date: new Date("2024-01-14T10:15:00"),
      duration: 3,
      blockType: BlockType.ANXIETY,
      interventionsCount: 2,
    },
    {
      id: "3",
      date: new Date("2024-01-13T16:45:00"),
      duration: 7,
      blockType: BlockType.STUTTER,
      interventionsCount: 4,
    },
    {
      id: "4",
      date: new Date("2024-01-12T09:00:00"),
      duration: 4,
      blockType: BlockType.MENTAL_BLOCK,
      interventionsCount: 2,
    },
    {
      id: "5",
      date: new Date("2024-01-11T11:30:00"),
      duration: 6,
      blockType: BlockType.FATIGUE,
      interventionsCount: 3,
    },
  ];

  const blockTypeColors: Record<BlockType, string> = {
    [BlockType.MENTAL_BLOCK]: "bg-blue-500/20 text-blue-400",
    [BlockType.STUTTER]: "bg-purple-500/20 text-purple-400",
    [BlockType.ANXIETY]: "bg-orange-500/20 text-orange-400",
    [BlockType.FATIGUE]: "bg-green-500/20 text-green-400",
    [BlockType.UNKNOWN]: "bg-gray-500/20 text-gray-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{t("history")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={18} className="text-gray-400" />
            <span className="text-gray-400 text-sm">Total Time</span>
          </div>
          <p className="text-2xl font-bold text-white">25 min</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Mic size={18} className="text-gray-400" />
            <span className="text-gray-400 text-sm">Total Sessions</span>
          </div>
          <p className="text-2xl font-bold text-white">{sessions.length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp size={18} className="text-gray-400" />
            <span className="text-gray-400 text-sm">Avg. Interventions</span>
          </div>
          <p className="text-2xl font-bold text-white">2.8</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Session History</h3>
        </div>
        <div className="divide-y divide-gray-700">
          {sessions.map((session) => (
            <div key={session.id} className="p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Mic size={20} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {session.date.toLocaleDateString("pt-BR")}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {session.date.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${blockTypeColors[session.blockType]}`}>
                  {session.blockType}
                </span>
                <span className="text-gray-400 text-sm">{session.interventionsCount} interventions</span>
                <span className="text-white font-medium">{session.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};