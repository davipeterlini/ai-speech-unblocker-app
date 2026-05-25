// AI Speech Unblocker domain types

export enum BlockType {
  MENTAL_BLOCK = "MENTAL_BLOCK",
  STUTTER = "STUTTER",
  ANXIETY = "ANXIETY",
  FATIGUE = "FATIGUE",
  UNKNOWN = "UNKNOWN",
}

export enum Severity {
  MILD = "MILD",
  MODERATE = "MODERATE",
  SEVERE = "SEVERE",
}

export interface SpeechSession {
  id: string;
  startedAt: Date;
  endedAt?: Date;
  blockType: BlockType;
  severity: Severity;
  transcripts: Transcript[];
  interventions: Intervention[];
}

export interface Transcript {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

export interface Intervention {
  id: string;
  type: "prompt" | "breathing" | "pause" | "reframe";
  content: string;
  timestamp: Date;
  effectiveness?: number; // 1-5
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  accessToken: string;
  settings: UserSettings;
}

export interface UserSettings {
  preferredPrompts: string[];
  voiceEnabled: boolean;
  notificationsEnabled: boolean;
}

export type View = "home" | "session" | "history" | "settings";

export interface AppStats {
  totalSessions: number;
  averageBlockDuration: number;
  mostCommonBlockType: BlockType;
  streakDays: number;
}