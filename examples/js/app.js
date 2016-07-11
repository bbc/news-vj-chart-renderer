requirejs.config({
    baseUrl: './',
    paths: {
        app: 'js/app',
        newsVjChartRenderer: '../newsVjChartRenderer',
        chartJsRenderingModule: '../chartRenderingModules/chartjsRendererV2',
        chartjs: 'js/libs/chartjs/Chart.min',
        fixtureData : 'fixtureData/fixtureData'
    }
});

requirejs([
    'newsVjChartRenderer',
    'fixtureData'
], function (
    newsVjChartRenderer,
    fixtureData
) {
    'use strict';
    var chart_1_renderer,
        chart_2_renderer,
        chart_3_renderer,
        chart_4_renderer,
        chart_4_obj,
        chart_4_legend,
        chart_5_renderer,
        chart_6_renderer,
        chart_7_renderer,
        chart_8_renderer,
        chart_8_obj,
        chart_8_legend,
        chart_9_renderer,
        chart_10_renderer,
        chart_10_obj,
        chart_10_legend;

    //=========================================================================
    // Vertical Bar Charts (Chart.js)
    //=========================================================================

    chart_1_renderer = newsVjChartRenderer.initChart(
        fixtureData.chartjs.vertical_bar_chart_default
    );
    chart_1_renderer.displayChart();

    chart_2_renderer = newsVjChartRenderer.initChart(
        fixtureData.chartjs.vertical_bar_chart_multiple_datasets
    );
    chart_2_renderer.displayChart();

    chart_3_renderer = newsVjChartRenderer.initChart(
        fixtureData.chartjs.vertical_bar_chart_default_custom_opts
    );
    chart_3_renderer.useCustomDatasetOpts();
    chart_3_renderer.displayChart();

    chart_4_renderer = newsVjChartRenderer.initChart(
        fixtureData.chartjs.vertical_bar_chart_multiple_datasets_custom_opts
    );
    chart_4_renderer.useCustomDatasetOpts();
    chart_4_obj = chart_4_renderer.displayChart();
    chart_4_legend = chart_4_obj.generateLegend();
    document.getElementById('chart_4_legend').innerHTML = chart_4_legend;

    //=========================================================================
    // Line Charts (Chart.js)
    //=========================================================================

    chart_5_renderer = newsVjChartRenderer.initChart(
        fixtureData.chartjs.line_chart_default
    );
    chart_5_renderer.displayChart();

    chart_6_renderer = newsVjChartRenderer.initChart(
        fixtureData.chartjs.line_chart_multiple_datasets
    );
    chart_6_renderer.displayChart();

    chart_7_renderer = newsVjChartRenderer.initChart(
        fixtureData.chartjs.line_chart_default_custom_opts
    );
    chart_7_renderer.useCustomDatasetOpts();
    chart_7_renderer.displayChart();

    chart_8_renderer = newsVjChartRenderer.initChart(
        fixtureData.chartjs.line_chart_multiple_datasets_custom_opts
    );
    chart_8_renderer.useCustomDatasetOpts();
    chart_8_obj = chart_8_renderer.displayChart();
    chart_8_legend = chart_8_obj.generateLegend();
    document.getElementById('chart_8_legend').innerHTML = chart_8_legend;


    //=========================================================================
    // Pie Charts (Chart.js)
    //=========================================================================

    chart_9_renderer = newsVjChartRenderer.initChart(
        fixtureData.chartjs.pie_chart_default
    );
    chart_9_renderer.displayChart();

    chart_10_renderer = newsVjChartRenderer.initChart(
        fixtureData.chartjs.pie_chart_custom_opts
    );
    chart_10_renderer.useCustomDatasetOpts();
    chart_10_obj = chart_10_renderer.displayChart();
    chart_10_legend = chart_10_obj.generateLegend();
    document.getElementById('chart_10_legend').innerHTML = chart_10_legend;

});
