import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    padding: 16px;
    overflow: hidden;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-logo {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  .header .title {
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .header-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    min-width: 0;
  }

  .header .location {
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .header .updated-ago {
    font-size: 10px;
    color: var(--secondary-text-color);
    opacity: 0.7;
  }

  /* Score Section */
  .score-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 0 16px;
  }

  .score-ring-container {
    position: relative;
    width: 140px;
    height: 140px;
  }

  .score-ring-container svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .score-ring-bg {
    fill: none;
    stroke: var(--divider-color, rgba(255, 255, 255, 0.05));
    stroke-width: 8;
  }

  .score-ring-fill {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s ease-out, stroke 0.5s ease;
  }

  .score-glow {
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    filter: blur(18px);
    opacity: 0.4;
    transition: background 0.5s ease;
    pointer-events: none;
  }

  .score-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .score-value .number {
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
    transition: color 0.5s ease;
  }

  .score-value .max {
    font-size: 11px;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .score-label {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: color 0.5s ease;
  }

  /* Explanation */
  .explanation {
    text-align: center;
    font-size: 13px;
    color: var(--secondary-text-color);
    line-height: 1.5;
    margin: 0 8px 16px;
  }

  /* Gradient Divider */
  .gradient-divider {
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      var(--divider-color, rgba(255, 255, 255, 0.1)),
      transparent
    );
    margin: 0;
  }

  /* Times Section */
  .times-section {
    display: flex;
    justify-content: center;
    gap: 12px;
    padding: 14px 0;
  }

  .time-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    border-radius: 16px;
    background: var(--card-background-color, rgba(255, 255, 255, 0.05));
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.05));
    transition: background 0.2s ease;
  }

  .time-pill:hover {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.08));
  }

  .time-pill .time-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .time-pill .time-icon-wrap.sunrise {
    background: rgba(251, 191, 36, 0.2);
    color: #fbbf24;
  }

  .time-pill .time-icon-wrap.sunset {
    background: rgba(249, 115, 22, 0.2);
    color: #fb923c;
  }

  .time-pill .time-icon-wrap ha-icon {
    --mdc-icon-size: 18px;
  }

  .time-pill .time-text {
    display: flex;
    flex-direction: column;
  }

  .time-pill .time-label {
    font-size: 10px;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .time-pill .time-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--primary-text-color);
    line-height: 1.2;
  }

  /* Weather Grid */
  .weather-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    padding: 14px 0;
  }

  .weather-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 12px 6px;
    border-radius: 12px;
    min-width: 0;
    background: var(--card-background-color, rgba(255, 255, 255, 0.05));
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.05));
    transition: background 0.2s ease;
  }

  .weather-card:hover {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.08));
  }

  .weather-card .weather-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--divider-color, rgba(255, 255, 255, 0.05));
    margin-bottom: 6px;
    transition: transform 0.2s ease;
  }

  .weather-card:hover .weather-icon-wrap {
    transform: scale(1.1);
  }

  .weather-card .weather-icon-wrap ha-icon {
    --mdc-icon-size: 16px;
  }

  .weather-card .weather-label {
    font-size: 9px;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }

  .weather-card .weather-value {
    font-size: 14px;
    font-weight: 700;
    color: var(--primary-text-color);
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .weather-card .weather-sub {
    font-size: 10px;
    color: var(--secondary-text-color);
    margin-top: 1px;
  }

  /* Wind direction arrow */
  .wind-dir {
    display: inline-block;
    font-size: 10px;
    color: var(--secondary-text-color);
    transition: transform 0.3s ease;
  }

  /* Error / Loading */
  .error {
    padding: 16px;
    text-align: center;
    color: var(--error-color, #db4437);
  }

  .unavailable {
    padding: 16px;
    text-align: center;
    color: var(--secondary-text-color);
  }
`;
