// Copyright 2021 manufosela
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { css } from 'lit';

export const RadarChartStyles = css`
  :host {
    display: block;
    padding: 25px;
    color: var(--radar-chart-text-color, #000);
  }
  table {
    margin: 2rem 0;
  }
  caption {
    font-size: 1.5rem;
    font-weight: bold;
  }
  tr:nth-child(even){
    background-color: var(--radar-chart-table-odd-background-color, #f2f2f2);
  }
  tr:nth-child(odd){
    background-color: var(--radar-chart-table-even-background-color, #fff);
  }
  th {
    font-weight: bold;
    background-color: var(--radar-chart-table-header-background-color, #fff);
  }
  td, th {
    text-align:center;
    margin:0 auto;
  }
  td[scope="row"] {
    color: var(--radar-chart-table-label-color, #00F);
    background-color: var(--radar-chart-table-label-background-color, #FFF);
    font-weight: var(--radar-chart-table-label-font-weight, bold);
  }
  .radar-chart__labels {
    color: var(--radar-chart-labels-color, #000);
    background-color: var(--radar-chart-labels-background-color, #fff);
  }
  .radar-chart__marks {
    color: var(--radar-chart-marks-color, #000);
    background-color: var(--radar-chart-marks-background-color, #fff);
  }
`;