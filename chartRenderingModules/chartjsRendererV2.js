define(function () {
    'use strict';

    var publicApi = {},
        Chart = function (chartObj) {
            this.chartObj = chartObj;
            this.customDataOptsSet = false;
            this.data = null;
            this.moduleName = 'chartjs';
        };

    Chart.prototype = {
        useCustomDatasetOpts: function () {
            this.customDataOptsSet = true;
        },

        displayChart: function () {
            this.convertDataToRequiredFormat();
            return this.renderChart();
        },

        getChartType: function () {
            switch (this.chartObj.chartType) {
            case 'chartjs-vertical-bar':
                return 'bar';
            case 'chartjs-horizontal-bar':
                return 'horizontalBar';
            case 'chartjs-line':
                return 'line';
            case 'chartjs-pie':
                return 'pie';
            default:
                if (window.console) {
                    console.log('Error: Chart type does not exist!');
                }
                break;
            }
        },

        convertData: function (type) {
            var rawData = this.chartObj.data.datasets,
                customDatasetOpts = this.chartObj.customDatasetOpts,
                datasets = [],
                i,
                mainColor,
                datasetObj;

            for (i = 0; i < rawData.length; i = i + 1) {
                mainColor = this.generateRandomColor();

                datasetObj = this.getDataset({
                    type: type,
                    i: i,
                    customDatasetOpts: customDatasetOpts,
                    mainColor: mainColor
                });

                datasetObj.data = rawData[i];

                datasets.push(datasetObj);
            }

            this.data = {
                labels: this.chartObj.data.labels,
                datasets: datasets
            };
        },

        convertVerticalBarData: function () {
            this.convertData('bar');
        },

        convertHorizontalBarData: function () {
            this.convertData('bar');
        },

        convertLineData: function () {
            this.convertData('line');
        },

        convertPieData: function () {
            this.convertData('pie');
        },

        convertDataToRequiredFormat: function () {
            var chartType = this.getChartType();

            if (chartType === 'horizontalBar') {
                this.convertData('bar');
            } else {
                this.convertData(chartType);
            }
        },

        getDataset: function (opts) {
            var i = opts.i,
                customDatasetOpts = opts.customDatasetOpts[i],
                mainColor = opts.mainColor,
                datasetTypes = {
                    bar: {
                        label: this.customDataOptsSet ? customDatasetOpts.label : 'Dataset: ' + (i + 1),
                        backgroundColor: this.customDataOptsSet ? customDatasetOpts.fillColor : mainColor,
                        borderColor: this.customDataOptsSet ? customDatasetOpts.strokeColor : mainColor,
                        hoverBackgroundColor: this.customDataOptsSet ? customDatasetOpts.highlightFill : mainColor,
                        hoverBorderColor: this.customDataOptsSet ? customDatasetOpts.highlightStroke : mainColor
                    },
                    line: {
                        label: this.customDataOptsSet ? customDatasetOpts.label : 'Dataset: ' + (i + 1),
                        fill: false,
                        backgroundColor: this.customDataOptsSet ? customDatasetOpts.fillColor : 'rgba(220,220,220,0.2)',
                        borderColor: this.customDataOptsSet ? customDatasetOpts.strokeColor : mainColor,
                        pointBackgroundColor: this.customDataOptsSet ? customDatasetOpts.pointColor : mainColor,
                        pointBorderColor: this.customDataOptsSet ? customDatasetOpts.pointStrokeColor : mainColor,
                        pointHoverBackgroundColor: this.customDataOptsSet ? customDatasetOpts.pointHighlightFill : mainColor,
                        pointHoverBorderColor: this.customDataOptsSet ? customDatasetOpts.pointHighlightStroke : mainColor
                    },
                    pie: {
                        label: this.customDataOptsSet ? customDatasetOpts.label : 'Label: ' + (i + 1),
                        backgroundColor: this.customDataOptsSet ? customDatasetOpts.color : this.generateRandomColor(),
                        hoverBackgroundColor: this.customDataOptsSet ? customDatasetOpts.highlight : this.generateRandomColor()
                    }
                };

            return datasetTypes[opts.type];
        },

        setCanvasContext: function () {
            this.canvasContext = document.getElementById(this.chartObj.domElementId).getContext('2d');
        },

        renderChart: function () {
            var chartType = this.getChartType,
                chart;

            this.setCanvasContext();

            chart = new this.chartObj.chartLibrary(this.canvasContext, {
                type: chartType,
                data: this.data,
                options: this.chartObj.chartOpts
            });

            return chart;
        },

        getRandomNumber: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        generateRandomColor: function () {
            var rgba = 'rgba(';
            rgba += this.getRandomNumber(0, 255) + ',';
            rgba += this.getRandomNumber(0, 255) + ',';
            rgba += this.getRandomNumber(0, 255) + ',1)';
            return rgba;
        }
    };

    publicApi.init = function (chartObj) {
        return new Chart(chartObj);
    };

    return publicApi;
});
