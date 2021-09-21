import { html, css, LitElement } from 'lit';
import { Chart } from '../Chart';

export class RadarChart extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--radar-chart-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      height: { type: Number },
    };
  }

  constructor() {
    super();
    this.height = 150;
    this.chartOptionsName = 'default';
    this.chartOptionsArr = { 
      default: {
        
      }
    };
  }

  firstUpdated() {
    this.marksCanvas = this.shadowRoot.querySelector('#marksChart');
    this.chartOptions = this.chartOptionsArr[this.chartOptionsName]
    this.radarChart2 = new Chart(this.marksCanvas, {
      type: 'radar',
      data: this.marksData,
      options: this.chartOptions
    });
  }

  render() {
    return html`
      <canvas id="marksChart" width="600" height="${this.height}"></canvas>
    `;
  }
}
