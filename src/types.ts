export const WEATHER_ITEMS = [
  "clouds",
  "humidity",
  "wind",
  "temperature",
  "visibility",
  "rain",
  "pressure",
  "aqi",
] as const;

export type WeatherItemKey = (typeof WEATHER_ITEMS)[number];

export type UnitSystem = "metric" | "imperial";
export type TimeFormat = "12h" | "24h" | "auto";

export interface CardConfig {
  type: string;
  entity: string;
  title?: string;
  show_weather_details?: boolean;
  show_explanation?: boolean;
  units?: UnitSystem;
  time_format?: TimeFormat;
  weather_items?: Partial<Record<WeatherItemKey, boolean>>;
}

export interface SunsetPredictionAttributes {
  label: string;
  explanation: string;
  confidence: string;
  target_date: string;
  sunset_time: string;
  sunrise_time: string;
  timezone: string;
  location: string;
  cloud_cover: number;
  humidity: number;
  visibility: number;
  wind_speed: number;
  wind_degree: number;
  rain_probability: number;
  condition: string;
  temperature: number;
  dew_point: number;
  pressure: number;
  aqi: number;
}

export const DEFAULT_WEATHER_ITEMS: Record<WeatherItemKey, boolean> = {
  clouds: true,
  humidity: true,
  wind: true,
  temperature: true,
  visibility: true,
  rain: true,
  pressure: true,
  aqi: true,
};

export const DEFAULT_CONFIG: Partial<CardConfig> = {
  show_weather_details: true,
  show_explanation: true,
  units: "metric",
  time_format: "auto",
  weather_items: { ...DEFAULT_WEATHER_ITEMS },
};

/* Score-based palette system matching sunset-predictor.com */
export interface ScorePalette {
  ring: string;   // stroke color for SVG ring
  glow: string;   // glow/shadow color
  text: string;   // score number color
  label: string;  // label text color
}

export const SCORE_PALETTES: Record<string, ScorePalette> = {
  epic: {
    ring: "#a78bfa",   // purple-400
    glow: "rgba(139, 92, 246, 0.3)",
    text: "#a78bfa",
    label: "#c084fc",  // purple-300
  },
  good: {
    ring: "#f97316",   // orange-500
    glow: "rgba(249, 115, 22, 0.3)",
    text: "#fb923c",   // orange-400
    label: "#fdba74",  // orange-300
  },
  fair: {
    ring: "#facc15",   // yellow-400
    glow: "rgba(245, 158, 11, 0.25)",
    text: "#fbbf24",   // amber-400
    label: "#fcd34d",  // amber-300
  },
  poor: {
    ring: "#94a3b8",   // slate-400
    glow: "rgba(100, 116, 139, 0.2)",
    text: "#94a3b8",
    label: "#cbd5e1",  // slate-300
  },
};

export function getPalette(score: number): ScorePalette {
  if (score >= 90) return SCORE_PALETTES.epic;
  if (score >= 70) return SCORE_PALETTES.good;
  if (score >= 40) return SCORE_PALETTES.fair;
  return SCORE_PALETTES.poor;
}

export const AQI_LABELS: Record<number, string> = {
  1: "Good",
  2: "Fair",
  3: "Moderate",
  4: "Poor",
  5: "Very Poor",
};

export const WEATHER_ITEM_LABELS: Record<WeatherItemKey, string> = {
  clouds: "Clouds",
  humidity: "Humidity",
  wind: "Wind",
  temperature: "Temperature",
  visibility: "Visibility",
  rain: "Rain probability",
  pressure: "Pressure",
  aqi: "Air quality (AQI)",
};
