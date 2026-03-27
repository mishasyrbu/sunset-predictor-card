import { LitElement, html, nothing, TemplateResult, svg } from "lit";
import { property, state } from "lit/decorators.js";
import {
  CardConfig,
  HomeAssistant,
  SunsetPredictionAttributes,
  DEFAULT_CONFIG,
  DEFAULT_WEATHER_ITEMS,
  AQI_LABELS,
  getPalette,
  WeatherItemKey,
  formatWeatherValue,
} from "./types";
import { cardStyles } from "./styles";
import "./editor";

const CIRCLE_RADIUS = 52;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

function relativeTime(isoString: string, _tick: number): string {
  const then = new Date(isoString).getTime();
  if (Number.isNaN(then)) return "";
  const diffSec = Math.floor((_tick - then) / 1000);
  if (diffSec < 10) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

let _instanceCounter = 0;

class SunsetPredictorCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CardConfig;
  @state() private _now = Date.now();
  private _instanceId = `sp-${_instanceCounter++}-${Math.random().toString(36).slice(2, 7)}`;
  private _tickInterval?: ReturnType<typeof setInterval>;

  static getConfigElement(): HTMLElement {
    return document.createElement("sunset-predictor-card-editor");
  }

  static getStubConfig(): Partial<CardConfig> {
    return { entity: "" };
  }

  setConfig(config: CardConfig): void {
    if (!config.entity) {
      throw new Error("Entity is required");
    }
    this._config = { ...DEFAULT_CONFIG, ...config } as CardConfig;
  }

  getCardSize(): number {
    let size = 4;
    if (this._config?.show_explanation) size += 1;
    if (this._config?.show_weather_details) size += 2;
    return size;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._tickInterval = setInterval(() => {
      this._now = Date.now();
    }, 30000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._tickInterval) {
      clearInterval(this._tickInterval);
      this._tickInterval = undefined;
    }
  }

  static styles = cardStyles;

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    const entityId = this._config.entity;
    const stateObj = this.hass.states[entityId];

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="error">Entity not found: ${entityId}</div>
        </ha-card>
      `;
    }

    const lastUpdated = stateObj.last_updated as string | undefined;

    if (stateObj.state === "unavailable" || stateObj.state === "unknown") {
      return html`
        <ha-card>
          ${this._renderHeader(stateObj.attributes, lastUpdated)}
          <div class="unavailable">Data currently unavailable</div>
        </ha-card>
      `;
    }

    const score = Number(stateObj.state);
    if (Number.isNaN(score)) {
      return html`
        <ha-card>
          ${this._renderHeader(stateObj.attributes, lastUpdated)}
          <div class="unavailable">Invalid score data</div>
        </ha-card>
      `;
    }
    const attrs = stateObj.attributes as SunsetPredictionAttributes;

    return html`
      <ha-card>
        ${this._renderHeader(attrs, lastUpdated)}
        ${this._renderScore(score, attrs)}
        ${this._config.show_explanation !== false
          ? this._renderExplanation(attrs.explanation)
          : nothing}
        <div class="gradient-divider"></div>
        ${this._renderTimes(attrs)}
        ${this._config.show_weather_details !== false
          ? html`
              <div class="gradient-divider"></div>
              ${this._renderWeatherGrid(attrs)}
            `
          : nothing}
      </ha-card>
    `;
  }

  private _renderHeader(
    attrs: Partial<SunsetPredictionAttributes>,
    lastUpdated?: string
  ): TemplateResult {
    const title = this._config.title || "Sunset Prediction";
    const gradId = `${this._instanceId}-grad`;
    const filtId = `${this._instanceId}-glow`;
    const updatedAgo = lastUpdated ? relativeTime(lastUpdated, this._now) : "";
    return html`
      <div class="header">
        <div class="header-left">
          ${svg`
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="header-logo">
              <defs>
                <linearGradient id="${gradId}" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#8B5CF6" />
                  <stop offset="50%" stop-color="#EC4899" />
                  <stop offset="100%" stop-color="#F59E0B" />
                </linearGradient>
                <filter id="${filtId}">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g transform="matrix(1.5, 0, 0, 1.5, -25, -25)">
                <circle cx="50" cy="50" r="25" fill="url(#${gradId})" filter="url(#${filtId})" />
                <path d="M 10 60 L 90 60" stroke="white" stroke-width="1" opacity="0.5" />
                <path d="M 20 67 L 80 67" stroke="white" stroke-width="1" opacity="0.3" />
                <path d="M 30 74 L 70 74" stroke="white" stroke-width="1" opacity="0.1" />
              </g>
            </svg>
          `}
          <span class="title">${title}</span>
        </div>
        <div class="header-right">
          ${attrs.location
            ? html`<span class="location">${attrs.location}</span>`
            : nothing}
          ${updatedAgo
            ? html`<span class="updated-ago">${updatedAgo}</span>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderScore(
    score: number,
    attrs: SunsetPredictionAttributes
  ): TemplateResult {
    const palette = getPalette(score);
    const offset =
      CIRCLE_CIRCUMFERENCE - (score / 100) * CIRCLE_CIRCUMFERENCE;

    return html`
      <div class="score-section">
        <div class="score-ring-container">
          <div class="score-glow" style="background: ${palette.glow}"></div>
          <svg viewBox="0 0 128 128">
            <circle class="score-ring-bg" cx="64" cy="64" r="${CIRCLE_RADIUS}" />
            <circle
              class="score-ring-fill"
              cx="64"
              cy="64"
              r="${CIRCLE_RADIUS}"
              stroke="${palette.ring}"
              stroke-dasharray="${CIRCLE_CIRCUMFERENCE}"
              stroke-dashoffset="${offset}"
              style="filter: drop-shadow(0 0 6px ${palette.ring})"
            />
          </svg>
          <div class="score-value">
            <span class="number" style="color: ${palette.text}">${score}</span>
            <span class="max">quality</span>
          </div>
        </div>
        <span class="score-label" style="color: ${palette.label}">
          ${attrs.label}
        </span>
      </div>
    `;
  }

  private _renderExplanation(explanation: string): TemplateResult {
    if (!explanation) return html``;
    return html`<div class="explanation">${explanation}</div>`;
  }

  private _renderTimes(attrs: SunsetPredictionAttributes): TemplateResult {
    const tz = attrs.timezone || undefined;
    const timeFmt = this._config.time_format || "auto";
    const fmt = (iso: string): string => {
      if (!iso) return "--:--";
      try {
        const opts: Intl.DateTimeFormatOptions = {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: tz,
        };
        if (timeFmt === "12h") opts.hour12 = true;
        else if (timeFmt === "24h") opts.hour12 = false;
        return new Date(iso).toLocaleTimeString([], opts);
      } catch {
        return "--:--";
      }
    };

    return html`
      <div class="times-section">
        <div class="time-pill">
          <span class="time-icon-wrap sunrise">
            <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
          </span>
          <div class="time-text">
            <span class="time-label">Sunrise</span>
            <span class="time-value">${fmt(attrs.sunrise_time)}</span>
          </div>
        </div>
        <div class="time-pill">
          <span class="time-icon-wrap sunset">
            <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
          </span>
          <div class="time-text">
            <span class="time-label">Sunset</span>
            <span class="time-value">${fmt(attrs.sunset_time)}</span>
          </div>
        </div>
      </div>
    `;
  }

  private _isItemVisible(key: WeatherItemKey): boolean {
    const items = {
      ...DEFAULT_WEATHER_ITEMS,
      ...this._config.weather_items,
    };
    return items[key] !== false;
  }

  private _renderWeatherGrid(
    attrs: SunsetPredictionAttributes
  ): TemplateResult {
    const imperial = this._config.units === "imperial";
    const fmt = (key: WeatherItemKey, raw: number | null | undefined) =>
      formatWeatherValue(key, raw, imperial);

    const windDirStyle = attrs.wind_degree != null
      ? `transform: rotate(${attrs.wind_degree}deg)`
      : "";

    const allItems: {
      key: WeatherItemKey;
      icon: string;
      label: string;
      value: string;
      sub?: unknown;
      color: string;
    }[] = [
      { key: "clouds", icon: "mdi:cloud", label: "Clouds", value: fmt("clouds", attrs.cloud_cover), color: "var(--weather-clouds, #93c5fd)" },
      { key: "humidity", icon: "mdi:water-percent", label: "Humidity", value: fmt("humidity", attrs.humidity), color: "var(--weather-humidity, #60a5fa)" },
      {
        key: "wind", icon: "mdi:weather-windy", label: "Wind",
        value: fmt("wind", attrs.wind_speed),
        sub: attrs.wind_degree != null
          ? html`<span class="wind-dir" style="${windDirStyle}">▲</span> ${attrs.wind_degree}°`
          : nothing,
        color: "var(--weather-wind, #d1d5db)",
      },
      { key: "temperature", icon: "mdi:thermometer", label: "Temp", value: fmt("temperature", attrs.temperature), color: "var(--weather-temp, #fbbf24)" },
      { key: "visibility", icon: "mdi:eye", label: "Visibility", value: fmt("visibility", attrs.visibility), color: "var(--weather-visibility, #2dd4bf)" },
      { key: "rain", icon: "mdi:weather-rainy", label: "Rain", value: fmt("rain", attrs.rain_probability), color: "var(--weather-rain, #818cf8)" },
      { key: "pressure", icon: "mdi:gauge", label: "Pressure", value: fmt("pressure", attrs.pressure), color: "var(--weather-pressure, #a78bfa)" },
      {
        key: "aqi", icon: "mdi:leaf", label: "AQI",
        value: fmt("aqi", attrs.aqi),
        sub: attrs.aqi != null ? (AQI_LABELS[attrs.aqi] || "") : nothing,
        color: "var(--weather-aqi, #34d399)",
      },
    ];

    const visibleItems = allItems.filter((item) => this._isItemVisible(item.key));

    if (visibleItems.length === 0) return html``;

    return html`
      <div class="weather-grid">
        ${visibleItems.map(
          (item) => html`
            <div class="weather-card">
              <div class="weather-icon-wrap" style="color: ${item.color}">
                <ha-icon icon="${item.icon}"></ha-icon>
              </div>
              <span class="weather-label">${item.label}</span>
              <span class="weather-value">${item.value}</span>
              ${item.sub
                ? html`<span class="weather-sub">${item.sub}</span>`
                : nothing}
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define("sunset-predictor-card", SunsetPredictorCard);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "sunset-predictor-card",
  name: "Sunset Predictor",
  description: "Display sunset quality predictions from sunset-predictor.com",
});
