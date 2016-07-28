define([
    'newsVjChartRenderer',
    'fixtureData'
],  function (
    newsVjChartRenderer,
    fixtureData
) {
    'use strict';
    describe('Chart renderer', function () {

        it('Routes to the correct rendering modules', function () {
            var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.vertical_bar_chart_default);
            expect(renderer.moduleName).toEqual('chartjs');
        });

    });

    describe('Modules', function () {

        describe('The chartJs library rendering module', function () {

            describe('Vertical Bar Chart', function () {

                it('One dataset', function () {
                    var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.vertical_bar_chart_default);
                    renderer.convertVerticalBarData();

                    expect(renderer.data.hasOwnProperty('datasets')).toEqual(true);
                    expect(renderer.data.hasOwnProperty('labels')).toEqual(true);

                    expect(renderer.customDataOptsSet).toEqual(false);
                    expect(renderer.data.datasets.length).toEqual(1);
                    expect(renderer.data.labels.length).toEqual(7);
                });

                it('One dataset with custom options', function () {
                    var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.vertical_bar_chart_default_custom_opts);
                    renderer.useCustomDatasetOpts();
                    renderer.convertVerticalBarData();

                    expect(renderer.data.hasOwnProperty('datasets')).toEqual(true);
                    expect(renderer.data.hasOwnProperty('labels')).toEqual(true);

                    expect(renderer.customDataOptsSet).toEqual(true);
                    expect(renderer.data.datasets[0].label).toEqual('Best Cities To Live');
                    expect(renderer.data.datasets.length).toEqual(1);
                    expect(renderer.data.labels.length).toEqual(7);
                });


                it('Multiple datasets', function () {
                    var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.vertical_bar_chart_multiple_datasets_custom_opts);
                    renderer.convertVerticalBarData();

                    expect(renderer.data.hasOwnProperty('datasets')).toEqual(true);
                    expect(renderer.data.hasOwnProperty('labels')).toEqual(true);

                    expect(renderer.customDataOptsSet).toEqual(false);
                    expect(renderer.data.datasets.length).toEqual(3);
                    expect(renderer.data.labels.length).toEqual(7);
                });

                it('Multiple datasets with custom options', function () {
                    var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.vertical_bar_chart_multiple_datasets_custom_opts);
                    renderer.useCustomDatasetOpts();
                    renderer.convertVerticalBarData();

                    expect(renderer.data.hasOwnProperty('datasets')).toEqual(true);
                    expect(renderer.data.hasOwnProperty('labels')).toEqual(true);

                    expect(renderer.customDataOptsSet).toEqual(true);
                    expect(renderer.data.datasets[2].label).toEqual('Company health: USA');
                    expect(renderer.data.datasets.length).toEqual(3);
                    expect(renderer.data.labels.length).toEqual(7);
                });

            });

            describe('Line Chart', function () {

                it('One dataset', function () {
                    var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.line_chart_default);
                    renderer.convertLineData();

                    expect(renderer.data.hasOwnProperty('datasets')).toEqual(true);
                    expect(renderer.data.hasOwnProperty('labels')).toEqual(true);

                    expect(renderer.customDataOptsSet).toEqual(false);
                    expect(renderer.data.datasets.length).toEqual(1);
                    expect(renderer.data.labels.length).toEqual(7);
                });

                it('One dataset with custom options', function () {
                    var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.line_chart_default_custom_opts);
                    renderer.useCustomDatasetOpts();
                    renderer.convertLineData();

                    expect(renderer.data.hasOwnProperty('datasets')).toEqual(true);
                    expect(renderer.data.hasOwnProperty('labels')).toEqual(true);

                    expect(renderer.customDataOptsSet).toEqual(true);
                    expect(renderer.data.datasets[0].label).toEqual('Sales in Billions');
                    expect(renderer.data.datasets.length).toEqual(1);
                    expect(renderer.data.labels.length).toEqual(7);
                });


                it('Multiple datasets', function () {
                    var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.line_chart_multiple_datasets);
                    renderer.convertLineData();

                    expect(renderer.data.hasOwnProperty('datasets')).toEqual(true);
                    expect(renderer.data.hasOwnProperty('labels')).toEqual(true);

                    expect(renderer.customDataOptsSet).toEqual(false);
                    expect(renderer.data.datasets.length).toEqual(2);
                    expect(renderer.data.labels.length).toEqual(7);
                });

                it('Multiple datasets with custom options', function () {
                    var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.line_chart_multiple_datasets_custom_opts);
                    renderer.useCustomDatasetOpts();
                    renderer.convertLineData();

                    expect(renderer.data.hasOwnProperty('datasets')).toEqual(true);
                    expect(renderer.data.hasOwnProperty('labels')).toEqual(true);

                    expect(renderer.customDataOptsSet).toEqual(true);
                    expect(renderer.data.datasets[1].label).toEqual('Sales in Billions: 2015');
                    expect(renderer.data.datasets.length).toEqual(2);
                    expect(renderer.data.labels.length).toEqual(7);
                });

            });

            describe('Pie Chart', function () {

                it('One dataset', function () {
                    var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.pie_chart_default);
                    renderer.convertPieData();

                    expect(renderer.data.hasOwnProperty('datasets')).toEqual(true);
                    expect(renderer.data.hasOwnProperty('labels')).toEqual(true);

                    expect(renderer.customDataOptsSet).toEqual(false);
                    expect(renderer.data.datasets.length).toEqual(1);
                    expect(renderer.data.labels.length).toEqual(7);
                });

                it('One dataset with custom options', function () {
                    var renderer = newsVjChartRenderer.initChart(fixtureData.chartjs.pie_chart_custom_opts);
                    renderer.useCustomDatasetOpts();
                    renderer.convertPieData();

                    expect(renderer.data.hasOwnProperty('datasets')).toEqual(true);
                    expect(renderer.data.hasOwnProperty('labels')).toEqual(true);

                    expect(renderer.customDataOptsSet).toEqual(true);
                    expect(renderer.data.labels[2]).toEqual('Facebook');
                    expect(renderer.data.datasets.length).toEqual(1);
                    expect(renderer.data.labels.length).toEqual(4);
                });

            });

        });

    });

});
