define(['chartJsRenderingModule'], function (chartJsRenderingModule) {
    'use strict';
    var publicApi = {},
        privateApi = {};

    /**
     * The Chart renderer
     * @param {object} obj Chart configuration
     * @returns {Object} Returns the results of routeToRenderer
     */
    publicApi.initChart = function (chart) {
        return privateApi.routeToRenderer(chart);
    };

    /**
     * Route to module for rendering
     * Each chart library has it own module to handle rendering
     * @param {object} obj Chart configuration
     * @returns {Object} Returns an instance of a renderer
     */
    privateApi.routeToRenderer = function (chart) {
        var renderers,
            chartName;

        chartName = chart.chartLibraryName;

        renderers = {
            chartjs : chartJsRenderingModule
        };

        if (renderers.hasOwnProperty(chartName)) {
            return renderers[chartName].init(chart);
        }

        return false;
    };

    return publicApi;
});
