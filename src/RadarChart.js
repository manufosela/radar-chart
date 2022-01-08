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
      id: { type: String, reflect: true },
      sideSize: { type: Number, reflect: true, attribute: 'side-size' },
      labels: { type: Array },
      marksData: { type: Array },
      chartOptionsName: {
        type: String,
        attribute: 'chart-options-name',
      },
      chartOptionsArr: { type: Object },
      fontSize: { type: Number, reflect: true, attribute: 'font-size' },
      scaleMin: { type: Number, reflect: true, attribute: 'scale-min' },
      scaleMax: { type: Number, reflect: true, attribute: 'scale-max' },
      scaleStep: { type: Number, reflect: true, attribute: 'scale-step' },
    };
  }

  constructor() {
    super();
    this.id = `radar-chart-${Math.random().toString(36).substring(2, 15)}`;
    this.sideSize = 500;
    this.chartOptionsName = 'default';
    this.fontSize = 10;
    this.scaleMin = 0;
    this.scaleMax = 10;
    this.scaleStep = 1;

    this.chartOptionsArr = {};
    this.marksData = {};
    this.labelsName = [];

    this.updateData = this.updateData.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.chartOptionsArr = {
      default: {
        scale: {
          display: true,
          min: this.scaleMin,
          max: this.scaleMax,
          stepSize: this.scaleStep,
          ticks: {
            showLabelBackdrop: false,
          },
          pointLabels: {
            fontSize: this.fontSize,
          },
          responsive: false,
        }
      },
      dots: {
        scale: {
          ticks: {
            beginAtZero: true,
            min: this.scaleMin,
            max: this.scaleMax,
            stepSize: this.scaleStep,
          },
          pointLabels: {
            fontSize: this.fontSize,
          },
        },
      },
    };
    this._setLabels();
    this._setDataset();
    document.addEventListener('radar-chart-update-data', this.updateData);
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

  updateData(e) {
    const { id, labelName = null, labelField = [], value = [] } = e.detail;
    if (id === this.id) {
      let index = 0;
      if (labelName !== null) {
        index = this.labelsName.indexOf(labelName);
      }
      labelField.forEach((field, i) => {
        const indexField = this.labels.indexOf(field);
        this.marksData.datasets[index].data[indexField] = value[i];
        this._drawChart();
      });
    }
  }

  setData(marksData, labelName = null) {
    let index = 0;
    if (labelName !== null) {
      index = this.labelsName.indexOf(labelName);
    }
    this.marksData.datasets[index].data = marksData;
    this._drawChart(index);
  }

  _setLabels() {
    const domLabels = [...this.querySelectorAll('tbody tr th')];
    this.labels = [];
    domLabels.forEach(label => {
      const labelText = label.innerText;
      this.labels.push(labelText);
    });
    this.marksData.labels = this.labels;
  }

  _setDataset() {
    this.marksData.datasets = [];
    const domMarks = [...this.querySelectorAll('tbody tr td')];
    domMarks.forEach(mark => {
      const randomRed = Math.floor(Math.random() * 255);
      const randomGreen = Math.floor(Math.random() * 255);
      const randomBlue = Math.floor(Math.random() * 255);
      const markData = {};
      markData.data = mark.innerText.split(',').map(Number);
      markData.label = mark.getAttribute('name');
      this.labelsName.push(mark.getAttribute('name'));
      markData.backgroundColor =
        mark.dataset.bgcolor ||
        `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 0.2)`;
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

  _drawChart(index = 0) {
    this.marksCanvas = this.shadowRoot.querySelector('#marksChart');
    this.chartOptions = this.chartOptionsArr[this.chartOptionsName];
    if (this.radarChart) {
      this.radarChart.data.datasets[0].data[index] = this.marksData.datasets[0].data[index];
      this.radarChart.update();
    } else {
      this.radarChart = new Chart(this.marksCanvas, {
        type: 'radar',
        data: this.marksData,
        options: this.chartOptions,
      });
    }
  }

  render() {
    return html`
      <div style="width:${this.sideSize}px; height:${this.sideSize}px;">
        <canvas id="marksChart"></canvas>
      </div>
    `;
  }
}
