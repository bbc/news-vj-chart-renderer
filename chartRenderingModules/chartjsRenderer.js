define(function () {
    'use strict';
    var publicApi = {},
        Chart;

    /**
     * The chartjs module for displaying charts
     * @param {object} obj Chart configuration
     * @returns {Object} Returns an instace of the chartjs renderer
     */
    publicApi.init = function (chartObj) {
        return new Chart(chartObj);
    };

    /**
     * The class for rendering charts using the chartjs library
     * @class
     * @param {object} obj Chart configuration
     */
    Chart = function (chartObj) {
        this.chartObj = chartObj;
        this.customDataOptsSet = false;
        this.data = null;
        this.moduleName = 'chartjs';
    };

    /**
     * Overwrite default dataset specific options with user defined ones
     * See chart js documentation for a list of valid dataset options
     */
    Chart.prototype.useCustomDatasetOpts = function () {
        this.customDataOptsSet = true;
    };

    /**
     * Displays a chart
     */
    Chart.prototype.displayChart = function () {
        this.convertDataToRequiredFormat();
        return this.renderChart();
    };

    /**
     * Converts user defined chart config data into a format required by chartjs
     */
    Chart.prototype.convertDataToRequiredFormat = function () {
        switch (this.chartObj.chartType) {
        case 'chartjs-vertical-bar':
            this.convertVerticalBarData();
            break;
        case 'chartjs-horizontal-bar':
            this.convertHorizontalBarData();
            break;
        case 'chartjs-line':
            this.convertLineData();
            break;
        case 'chartjs-pie':
            this.convertPieData();
            break;
        default:
            if (window.console !== undefined) {
                console.log('Error: Chart type does not exist!');
            }
            break;
        }
    };

    /**
     * Data conversion for vertical bar charts
     */
    Chart.prototype.convertVerticalBarData = function () {
        var i,
            max,
            rawData,
            customDatasetOpts,
            datasetHolder = [],
            datasetObjHolder,
            mainColor;

        rawData = this.chartObj.data.datasets;
        customDatasetOpts = this.chartObj.customDatasetOpts;

        for (i = 0, max = rawData.length; i < max; i = i + 1) {

            mainColor = this.generateRandomColor();

            datasetObjHolder = {
                label: this.customDataOptsSet ? customDatasetOpts[i].label : 'Dataset: ' + (i + 1),
                fillColor: this.customDataOptsSet ? customDatasetOpts[i].fillColor : mainColor,
                strokeColor: this.customDataOptsSet ? customDatasetOpts[i].strokeColor : mainColor,
                highlightFill: this.customDataOptsSet ? customDatasetOpts[i].highlightFill : mainColor,
                highlightStroke: this.customDataOptsSet ? customDatasetOpts[i].highlightStroke : mainColor,
                data: rawData[i]
            };
            datasetHolder.push(datasetObjHolder);
        }

        this.data = {
            labels: this.chartObj.data.labels,
            datasets: datasetHolder
        };
    };

    /**
     * Data conversion for horizontal bar charts
     */
    Chart.prototype.convertHorizontalBarData = function () {
        var i,
            max,
            rawData,
            customDatasetOpts,
            datasetHolder = [],
            datasetObjHolder,
            mainColor;

        rawData = this.chartObj.data.datasets;
        customDatasetOpts = this.chartObj.customDatasetOpts;

        for (i = 0, max = rawData.length; i < max; i = i + 1) {

            mainColor = this.generateRandomColor();

            datasetObjHolder = {
                label: this.customDataOptsSet ? customDatasetOpts[i].label : 'Dataset: ' + (i + 1),
                fillColor: this.customDataOptsSet ? customDatasetOpts[i].fillColor : mainColor,
                strokeColor: this.customDataOptsSet ? customDatasetOpts[i].strokeColor : mainColor,
                highlightFill: this.customDataOptsSet ? customDatasetOpts[i].highlightFill : mainColor,
                highlightStroke: this.customDataOptsSet ? customDatasetOpts[i].highlightStroke : mainColor,
                data: rawData[i]
            };
            datasetHolder.push(datasetObjHolder);
        }

        this.data = {
            labels: this.chartObj.data.labels,
            datasets: datasetHolder
        };
    };

    /**
     * Data conversion for line charts
     */
    Chart.prototype.convertLineData = function () {
        var i,
            max,
            rawData,
            customDatasetOpts,
            datasetHolder = [],
            datasetObjHolder,
            mainColor;

        rawData = this.chartObj.data.datasets;
        customDatasetOpts = this.chartObj.customDatasetOpts;

        for (i = 0, max = rawData.length; i < max; i = i + 1) {

            mainColor = this.generateRandomColor();

            datasetObjHolder = {
                label: this.customDataOptsSet ? customDatasetOpts[i].label : 'Dataset: ' + (i + 1),
                fillColor: this.customDataOptsSet ? customDatasetOpts[i].fillColor : 'rgba(220,220,220,0.2)',
                strokeColor: this.customDataOptsSet ? customDatasetOpts[i].strokeColor : mainColor,
                pointColor: this.customDataOptsSet ? customDatasetOpts[i].pointColor : mainColor,
                pointStrokeColor: this.customDataOptsSet ? customDatasetOpts[i].pointStrokeColor : mainColor,
                pointHighlightFill: this.customDataOptsSet ? customDatasetOpts[i].pointHighlightFill : mainColor,
                pointHighlightStroke: this.customDataOptsSet ? customDatasetOpts[i].pointHighlightStroke : mainColor,
                data: rawData[i]
            };
            datasetHolder.push(datasetObjHolder);
        }
        this.data = {
            labels: this.chartObj.data.labels,
            datasets: datasetHolder
        };
    };

    /**
     * Data conversion for pie charts
     */
    Chart.prototype.convertPieData = function () {
        var i,
            max,
            rawData,
            customDatasetOpts,
            dataHolder = [],
            datasetObjHolder;

        rawData = this.chartObj.data.datasets[0];
        customDatasetOpts = this.chartObj.customDatasetOpts;

        for (i = 0, max = rawData.length; i < max; i = i + 1) {
            datasetObjHolder = {
                value: rawData[i],
                color: this.customDataOptsSet ? customDatasetOpts[i].color : this.generateRandomColor(),
                highlight: this.customDataOptsSet ? customDatasetOpts[i].highlight : this.generateRandomColor(),
                label: this.customDataOptsSet ? customDatasetOpts[i].label : 'Label: ' + (i + 1)
            };
            dataHolder.push(datasetObjHolder);
        }
        this.data = dataHolder;
    };


    /**
     * Decide the type of chart to render
     */
    Chart.prototype.renderChart = function () {
        switch (this.chartObj.chartType) {
        case 'chartjs-vertical-bar':
            return this.renderVerticalBarChart();
        case 'chartjs-horizontal-bar':
            return this.renderHorizontalBarChart();
        case 'chartjs-line':
            return this.renderLineChart();
        case 'chartjs-pie':
            return this.renderPieChart();
        default:
            break;
        }
    };

    /**
     * Init a vertical bar chart using chartjs
     */
    Chart.prototype.renderVerticalBarChart = function () {
        this.setCanvasContext();
        return new this.chartObj.chartLibrary(this.canvasContext).Bar(this.data, this.chartObj.chartOpts);
    };

    /**
     * Init a horizontal bar chart using chartjs
     */
    Chart.prototype.renderHorizontalBarChart = function () {
        this.setCanvasContext();
        return new this.chartObj.chartLibrary(this.canvasContext).HorizontalBar(this.data, this.chartObj.chartOpts);
    };

    /**
     * Init a line chart using chartjs
     */
    Chart.prototype.renderLineChart = function () {
        this.setCanvasContext();
        return new this.chartObj.chartLibrary(this.canvasContext).Line(this.data, this.chartObj.chartOpts);
    };

    /**
     * Init a pie chart using chartjs
     */
    Chart.prototype.renderPieChart = function () {
        this.setCanvasContext();
        return new this.chartObj.chartLibrary(this.canvasContext).Pie(this.data, this.chartObj.chartOpts);
    };

    /**
     * Set canvas context
     */
    Chart.prototype.setCanvasContext = function () {
        this.canvasContext = document.getElementById(this.chartObj.domElementId).getContext('2d');
    };

    /**
     * Generate a random number
     */
    Chart.prototype.getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * Generate a random color RGBA
     */
    Chart.prototype.generateRandomColor = function () {
        var rgba = 'rgba(';
        rgba += this.getRandomNumber(0, 255) + ',';
        rgba += this.getRandomNumber(0, 255) + ',';
        rgba += this.getRandomNumber(0, 255) + ',1)';
        return rgba;
    };

    return publicApi;
});
