# \<radar-chart>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i @manufosela/radar-chart
```

## Usage

```html
<script type="module">
  import 'radar-chart/radar-chart.js';
</script>

<radar-chart id="radarchart1" side-size="500" scale-min="0" scale-max="100" scale-step="10" show-table="true">
  <table>
    <caption>Data Table to radar chart for Student 1</caption>
    <tbody>
      <tr class="radar-chart__labels">
        <th scope="col">English</th>
        <th scope="col">Maths</th>
        <th scope="col">Physics</th>
        <th scope="col">Chemistry</th>
        <th scope="col">Biology</th>
        <th scope="col">History</th>
      </tbody>
      <tr class="radar-chart__marks">
        <td name="Estudiante 1" data-bgcolor="rgba(255,0,0,0.2)">
          80, 80, 90, 70, 80, 90
        </td>
        <td name="Estudiante 2">90, 70, 80, 80, 90, 80</td>
        <td name="Estudiante 3">60, 80, 70, 70, 80, 90</td>
        <td name="Estudiante 4">70, 70, 80, 80, 90, 80</td>
        <td name="Estudiante 4">80, 80, 70, 60, 70, 80</td>
      </tr>
    </tbody>
  </table>
</radar-chart>
```

## Events

### Dispatching events

- **wc-ready**: Fired when the webcomponent is rendered and ready.

## Styling

- **--radar-chart-text-color**. Default #000
- **--radar-chart-table-odd-background-color**. Default #f2f2f2
- **--radar-chart-table-even-background-color**. Default #fff
- **--radar-chart-table-header-background-color**. Default #fff
- **--radar-chart-table-label-color**. Default #00F
- **--radar-chart-table-label-background-color**. Default #FFF
- **--radar-chart-table-label-font-weight**. Default bold
- **--radar-chart-labels-color**. Default #000
- **--radar-chart-labels-background-color**. Default #fff
- **--radar-chart-marks-color**. Default #000
- **--radar-chart-marks-background-color**. Default #fff

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
