import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { property, state } from "lit/decorators.js";
import {
  CardConfig,
  DEFAULT_CONFIG,
  DEFAULT_WEATHER_ITEMS,
  WEATHER_ITEMS,
  WEATHER_ITEM_LABELS,
  WeatherItemKey,
} from "./types";

const BASE_SCHEMA = [
  { name: "entity", selector: { entity: { domain: "sensor" } } },
  { name: "title", selector: { text: {} } },
  {
    name: "units",
    selector: {
      select: {
        options: [
          { value: "metric", label: "Metric (°C, m/s, km)" },
          { value: "imperial", label: "Imperial (°F, mph, mi)" },
        ],
        mode: "dropdown",
      },
    },
  },
  {
    name: "time_format",
    selector: {
      select: {
        options: [
          { value: "auto", label: "Auto (browser default)" },
          { value: "12h", label: "12-hour (AM/PM)" },
          { value: "24h", label: "24-hour" },
        ],
        mode: "dropdown",
      },
    },
  },
  { name: "show_explanation", selector: { boolean: {} } },
  { name: "show_weather_details", selector: { boolean: {} } },
];

export class SunsetPredictorCardEditor extends LitElement {
  @property({ attribute: false }) public hass: any;
  @state() private _config!: CardConfig;

  setConfig(config: CardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value;
    const event = new CustomEvent("config-changed", {
      detail: { config: { ...this._config, ...config } },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _weatherItemToggled(key: WeatherItemKey, checked: boolean): void {
    const currentItems = {
      ...DEFAULT_WEATHER_ITEMS,
      ...this._config.weather_items,
    };
    const weatherItems = { ...currentItems, [key]: checked };
    const event = new CustomEvent("config-changed", {
      detail: { config: { ...this._config, weather_items: weatherItems } },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const data = {
      show_weather_details: DEFAULT_CONFIG.show_weather_details,
      show_explanation: DEFAULT_CONFIG.show_explanation,
      units: DEFAULT_CONFIG.units,
      time_format: DEFAULT_CONFIG.time_format,
      ...this._config,
    };

    const showDetails = data.show_weather_details !== false;
    const weatherItems = {
      ...DEFAULT_WEATHER_ITEMS,
      ...this._config.weather_items,
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${BASE_SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${showDetails
        ? html`
            <div class="weather-toggles">
              <div class="section-label">Weather items</div>
              <div class="toggle-grid">
                ${WEATHER_ITEMS.map(
                  (key) => html`
                    <label class="toggle-item">
                      <ha-switch
                        .checked=${weatherItems[key] !== false}
                        @change=${(e: Event) =>
                          this._weatherItemToggled(
                            key,
                            (e.target as any).checked
                          )}
                      ></ha-switch>
                      <span class="toggle-label">${WEATHER_ITEM_LABELS[key]}</span>
                    </label>
                  `
                )}
              </div>
            </div>
          `
        : ""}
    `;
  }

  private _computeLabel(schema: { name: string }): string {
    const labels: Record<string, string> = {
      entity: "Entity",
      title: "Title (optional)",
      units: "Units",
      time_format: "Time format",
      show_weather_details: "Show weather details",
      show_explanation: "Show explanation",
    };
    return labels[schema.name] || schema.name;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      .weather-toggles {
        margin-top: 16px;
        padding: 0 16px;
      }
      .section-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }
      .toggle-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px 16px;
      }
      .toggle-item {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .toggle-label {
        font-size: 14px;
        color: var(--primary-text-color);
      }
    `;
  }
}

customElements.define(
  "sunset-predictor-card-editor",
  SunsetPredictorCardEditor
);
