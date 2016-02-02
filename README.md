# news-vj-chart-renderer

Display charts using different JavaScript libraries via a single API

## Using the chart renderer

**See the examples folder simple and advanced use cases.**

Set up paths using [RequireJs](http://www.requirejs.org/) to `newsVjChartRenderer.js`, your selected library and the corresponding module under `chartRenderingModules/` then call `newsVjChartRenderer.initChart` with some config.

```javascript
var config = {
    data:             {
        labels : ['Vienna', 'Zurich', 'Auckland', 'Munich', 'Vancouver', 'Dusseldorf', 'Frankfurt'],
        datasets: [[65, 59, 90, 81, 56, 55, 40]]
    },
    domElementId:     'chart_3',
    chartLibraryName: 'chartjs',
    chartLibrary:     chartjs,
    chartType:        'chartjs-vertical-bar',
    chartOpts:  {},
    customDatasetOpts: []
};

var renderer = newsVjChartRenderer.initChart(config);
var chart = renderer.displayChart();
```

## Supported Libraries & Charts

[Chart.js](http://www.chartjs.org/) Vertical bar, Line and Pie charts are currently supported. More libraries and charts will follow.

## Contributing

Add modules to the `chartRenderingModules` folder following the same structure / api as `chartRenderingModules/chartjsRenderer.js`. Write tests, make sure they pass and lint nicely then issue a PR.
