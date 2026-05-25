export const APP_NAME = "AI Speech Unblocker";
export const APP_VERSION = "0.1.0";

export const DEFAULT_PROMPTS = [
  "Take a deep breath and start with a simple word.",
  "Remember: your message matters, not the speed.",
  "Pause for a moment - gathering thoughts is strength.",
  "Speak slowly - your brain can catch up.",
  "One idea at a time. You got this.",
];

export const BLOCK_TYPE_LABELS: Record<string, string> = {
  MENTAL_BLOCK: "Mental Block",
  STUTTER: "Stutter",
  ANXIETY: "Anxiety",
  FATIGUE: "Fatigue",
  UNKNOWN: "Unknown",
};

export const SEVERITY_LABELS: Record<string, string> = {
  MILD: "Mild",
  MODERATE: "Moderate",
  SEVERE: "Severe",
};