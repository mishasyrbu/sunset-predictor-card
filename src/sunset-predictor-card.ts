import { LitElement, html, nothing, TemplateResult, svg } from "lit";
import { property, state } from "lit/decorators.js";
import {
  CardConfig,
  SunsetPredictionAttributes,
  DEFAULT_CONFIG,
  DEFAULT_WEATHER_ITEMS,
  AQI_LABELS,
  getPalette,
  WeatherItemKey,
} from "./types";
import { cardStyles } from "./styles";
import "./editor";

const CIRCLE_RADIUS = 52;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

let _instanceCounter = 0;

class SunsetPredictorCard extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private _config!: CardConfig;
  private _instanceId = `sp-${_instanceCounter++}`;

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

    if (stateObj.state === "unavailable" || stateObj.state === "unknown") {
      return html`
        <ha-card>
          ${this._renderHeader(stateObj.attributes)}
          <div class="unavailable">Data currently unavailable</div>
        </ha-card>
      `;
    }

    const score = Number(stateObj.state);
    if (Number.isNaN(score)) {
      return html`
        <ha-card>
          ${this._renderHeader(stateObj.attributes)}
          <div class="unavailable">Invalid score data</div>
        </ha-card>
      `;
    }
    const attrs = stateObj.attributes as SunsetPredictionAttributes;

    return html`
      <ha-card>
        ${this._renderHeader(attrs)}
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
    attrs: Partial<SunsetPredictionAttributes>
  ): TemplateResult {
    const title = this._config.title || "Sunset Prediction";
    const gradId = `${this._instanceId}-grad`;
    const filtId = `${this._instanceId}-glow`;
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
        ${attrs.location
          ? html`<span class="location">${attrs.location}</span>`
          : nothing}
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
    const fmt = (iso: string): string => {
      if (!iso) return "--:--";
      try {
        return new Date(iso).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: tz,
        });
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
      {
        key: "clouds",
        icon: "mdi:cloud",
        label: "Clouds",
        value: attrs.cloud_cover != null ? `${attrs.cloud_cover}%` : "—",
        color: "#93c5fd",
      },
      {
        key: "humidity",
        icon: "mdi:water-percent",
        label: "Humidity",
        value: attrs.humidity != null ? `${attrs.humidity}%` : "—",
        color: "#60a5fa",
      },
      {
        key: "wind",
        icon: "mdi:weather-windy",
        label: "Wind",
        value: attrs.wind_speed != null ? `${attrs.wind_speed} m/s` : "—",
        sub: attrs.wind_degree != null
          ? html`<span class="wind-dir" style="${windDirStyle}">▲</span> ${attrs.wind_degree}°`
          : nothing,
        color: "#d1d5db",
      },
      {
        key: "temperature",
        icon: "mdi:thermometer",
        label: "Temp",
        value:
          attrs.temperature != null
            ? `${attrs.temperature.toFixed(1)}°C`
            : "—",
        color: "#fbbf24",
      },
      {
        key: "visibility",
        icon: "mdi:eye",
        label: "Visibility",
        value:
          attrs.visibility != null
            ? `${(attrs.visibility / 1000).toFixed(1)} km`
            : "—",
        color: "#2dd4bf",
      },
      {
        key: "rain",
        icon: "mdi:weather-rainy",
        label: "Rain",
        value:
          attrs.rain_probability != null
            ? `${attrs.rain_probability}%`
            : "—",
        color: "#818cf8",
      },
      {
        key: "pressure",
        icon: "mdi:gauge",
        label: "Pressure",
        value: attrs.pressure != null ? `${attrs.pressure} hPa` : "—",
        color: "#a78bfa",
      },
      {
        key: "aqi",
        icon: "mdi:leaf",
        label: "AQI",
        value: attrs.aqi != null ? `${attrs.aqi}/5` : "—",
        sub: attrs.aqi != null ? (AQI_LABELS[attrs.aqi] || "") : nothing,
        color: "#34d399",
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
