import { html, LitElement } from 'lit';
import Chart from 'chart.js/auto'
import { RadarChartStyles } from './radar-chart-styles.js';

export class RadarChart extends LitElement {
  static get is() {
    return "radar-chart";
  }

  static get styles() {
     return [RadarChartStyles];
  }

  static get properties() {
    return {
      sideSize: { type: Number, reflect: true, attribute: 'side-size' },
      labels: { type: Array },
      marksData: { type: Array },
      chartOptionsName: { type: String, reflect: true, attribute: 'chart-options-name' },
      chartOptionsArr: { type: Object, reflect: true }
    };
  }

  constructor() {
    super();
    this.id = `radar-chart-${Math.random().toString(36).substring(2, 15)}`;
    this.sideSize = 500;
    this.chartOptionsName = 'default';
    this.chartOptionsArr = { 
      default: {},
      dots: {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 10
          },
          pointLabels: {
            fontSize: 10
          }
        }
      }
    };
    this.marksData = {};
    this.labelsName = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.marksData = {};
    this.labelsName = [];

    this._setLabels();
    this._setDataset();
  }

  firstUpdated() {
    const wcReadyEvent = new CustomEvent('wc-ready', {
      detail: {
        id: this.id,
        wcTag: this.is,
      }
    });
    this._drawChart();
    document.dispatchEvent(wcReadyEvent);
  }

  setData(marksData, labelName = null) {
    let index = 0;
    if (labelName !== null) {
      index = this.labelsName.indexOf(labelName);
    }
    this.marksData.datasets[index].data = marksData;
    this._drawChart();
  }

  _setLabels() {
    const domLabels = [...this.querySelectorAll('.radar-chart__labels li')];
    this.labels = [];
    domLabels.forEach((label) => {
      const labelText = label.innerText;
      this.labels.push(labelText);
    });
    this.marksData.labels = this.labels;
  }

  _setDataset() {
    this.marksData.datasets = [];
    const domMarks = [...this.querySelectorAll('.radar-chart__marks li')];
    domMarks.forEach((mark) => {
      const randomRed = Math.floor(Math.random() * 255);
      const randomGreen = Math.floor(Math.random() * 255);
      const randomBlue = Math.floor(Math.random() * 255);
      const markData = {}
      markData.data = mark.innerText.split(',').map(Number);
      markData.label = mark.getAttribute('name');
      this.labelsName.push(mark.getAttribute('name'));
      markData.backgroundColor = `rgba(${randomRed},${randomGreen},${randomBlue},0.2)`;
      if (this.chartOptionsName === 'dots') {
        markData.fill = false;
        markData.radius = 10;
        markData.pointRadius = 10;
        markData.pointBorderWidth = 2;
        markData.pointBackgroundColor = `rgba(${randomRed},${randomGreen},${randomBlue}, 0.2)`;
        markData.pointBorderColor = `rgba(${randomRed},${randomGreen},${randomBlue}, 0.6)`;
        markData.pointHoverRadius = 20;
      }
      this.marksData.datasets.push(markData);
    });
  }

  _drawChart() {
    this.marksCanvas = this.shadowRoot.querySelector('#marksChart');
    this.chartOptions = this.chartOptionsArr[this.chartOptionsName];
    if (this.radarChart) {
      this.radarChart.destroy();
    }
    this.radarChart = new Chart(this.marksCanvas, {
      type: 'radar',
      data: this.marksData,
      options: this.chartOptions
    });
  }

  render() {
    return html`
      <div style="width:${this.sideSize}px; height:${this.sideSize}px;">
        <canvas id="marksChart"></canvas>
      </div>
    `;
  }
}
