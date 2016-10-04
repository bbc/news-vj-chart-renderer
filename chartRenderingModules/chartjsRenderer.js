define(function () {
    'use strict';

    var publicApi = {};

    var Chart = function (chartObj) {
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
            var i = opts.i;
            var customDatasetOpts = opts.customDatasetOpts[i];
            var mainColor = opts.mainColor;
            var datasetTypes = {
                bar: function () {
                    return {
                        label: this.customDataOptsSet ? customDatasetOpts.label : 'Dataset: ' + (i + 1),
                        backgroundColor: this.customDataOptsSet ? customDatasetOpts.fillColor : mainColor,
                        borderColor: this.customDataOptsSet ? customDatasetOpts.strokeColor : mainColor,
                        hoverBackgroundColor: this.customDataOptsSet ? customDatasetOpts.highlightFill : mainColor
                    };
                },
                line: function () {
                    var dataset = {
                        label: this.customDataOptsSet ? customDatasetOpts.label : 'Dataset: ' + (i + 1),
                        fill: false,
                        backgroundColor: this.customDataOptsSet ? customDatasetOpts.fillColor : 'rgba(220,220,220,0.2)',
                        borderColor: this.customDataOptsSet ? customDatasetOpts.strokeColor : mainColor,
                        pointBackgroundColor: this.customDataOptsSet ? customDatasetOpts.pointColor : mainColor,
                        pointBorderColor: this.customDataOptsSet ? customDatasetOpts.pointStrokeColor : mainColor,
                        pointHoverBackgroundColor: this.customDataOptsSet ? customDatasetOpts.pointHighlightFill : mainColor,
                        pointHoverBorderColor: this.customDataOptsSet ? customDatasetOpts.pointHighlightStroke : mainColor
                    };

                    if (this.customDataOptsSet) {
                        dataset.lineTension = this.chartObj.chartOpts.bezierCurve ? this.chartObj.chartOpts.bezierCurveTension : 0;
                        dataset.fill = this.chartObj.chartOpts.datasetFill;
                        dataset.borderWidth = this.chartObj.chartOpts.datasetStrokeWidth;
                        dataset.pointRadius = this.chartObj.chartOpts.pointDot ? this.chartObj.chartOpts.pointDotRadius : 0;
                        dataset.pointBorderWidth = this.chartObj.chartOpts.pointDotStrokeWidth;
                        dataset.pointHitRadius = this.chartObj.chartOpts.pointHitDetectionRadius;
                    }

                    return dataset;
                },
                pie: function () {
                    return {
                        label: this.customDataOptsSet ? customDatasetOpts.label : 'Label: ' + (i + 1),
                        backgroundColor: this.customDataOptsSet ? this.chartObj.chartOpts.segmentColors.split(',') : mainColor,
                        hoverBackgroundColor: this.customDataOptsSet ? this.chartObj.chartOpts.segmentHighlight.split(',') : mainColor
                    };
                }
            };

            return datasetTypes[opts.type].bind(this)();
        },

        setCanvasContext: function () {
            this.canvasContext = document.getElementById(this.chartObj.domElementId).getContext('2d');
        },

        renderChart: function () {
            var chartType = this.getChartType(),
                config,
                chart;

            this.setCanvasContext();
            this.transformOptions(chartType);

            config = {
                type: chartType,
                data: this.data,
                options: this.chartObj.chartOpts
            };

            chart = new this.chartObj.chartLibrary(this.canvasContext, config);

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
        },

        transformAnimationConfig: function (type) {
            var initialAnimationValue = this.chartObj.chartOpts.animation,
                typeSpecificTransformations = {
                    pie: function () {
                        var newAnimationObject = {
                            animateRotate: this.chartObj.chartOpts.animateRotate,
                            animateScale: this.chartObj.chartOpts.animateScale,
                            easingFunction: this.chartObj.chartOpts.animationEasing,
                            duration: 1000
                        };

                        return newAnimationObject;
                    }.bind(this)
                };

            // always delete initial animation property
            // uses default animation config if no animation property
            delete this.chartObj.chartOpts.animation;

            // if transformation for current chart type exists, perform it
            if (typeSpecificTransformations[type]) {
                this.chartObj.chartOpts.animation = typeSpecificTransformations[type]();
            }

            // if animation was initially set to boolean false, set duration to 0
            if (initialAnimationValue === false) {
                this.chartObj.chartOpts.animation.duration = 0;
            }
        },

        barLineLegendCallback: function (chart) {
            var legendHtml = [],
                legendSymbolType = {
                    bar: 'squares',
                    horizontalBar: 'squares',
                    line: 'lines'
                },
                chartType = this.getChartType(),
                i;

            legendHtml.push('<ul class="' + chartType + '-legend line-legend-list--inline legendChartJs">');
            for (i = 0; i < chart.data.datasets.length; i = i + 1) {
                legendHtml.push('<li>');
                legendHtml.push('<div class="line-legend-list__' + legendSymbolType[chartType] + '" style="background-color:' + chart.data.datasets[i].backgroundColor + ';"></div>');
                if (chart.data.datasets[i].label) {
                    legendHtml.push(chart.data.datasets[i].label);
                }
                legendHtml.push('</li>');
            }
            legendHtml.push('</ul>');

            return legendHtml.join('');
        },

        pieLegendCallback: function (chart) {
            var legendHtml = [],
                i;

            legendHtml.push('<ul class="pie-legend line-legend-list legendChartJs">');
            for (i = 0; i < chart.data.datasets[0].data.length; i = i + 1) {
                legendHtml.push('<li>');
                legendHtml.push('<div class="line-legend-list__squares" style="background-color:' + chart.data.datasets[0].backgroundColor[i] + ';"></div>');
                if (chart.data.labels[i]) {
                    legendHtml.push(chart.data.labels[i]);
                }
                legendHtml.push('</li>');
            }
            legendHtml.push('</ul>');

            return legendHtml.join('');
        },

        transformLegendConfig: function (type) {
            this.chartObj.chartOpts.legend = {
                display: false
            };

            this.chartObj.chartOpts.legendCallback = type === 'pie' ? this.pieLegendCallback : this.barLineLegendCallback.bind(this);
        },

        transformScaleConfig: function (type) {
            var tickCallback = function (value) {
                return window.NumberFormatter.format(this.chartObj.service, value);
            };

            var scalesConfig = {
                xAxes: [{
                    scaleLabel: {
                        fontColor: this.chartObj.chartOpts.scaleFontColor,
                        fontFamily: this.chartObj.chartOpts.scaleFontFamily,
                        fontSize: this.chartObj.chartOpts.scaleFontSize,
                        fontStyle: this.chartObj.chartOpts.scaleFontStyle
                    },
                    ticks: {
                        beginAtZero: this.chartObj.chartOpts.scaleBeginAtZero,
                        fontColor: this.chartObj.chartOpts.scaleFontColor,
                        fontFamily: this.chartObj.chartOpts.scaleFontFamily,
                        fontSize: this.chartObj.chartOpts.scaleFontSize,
                        fontStyle: this.chartObj.chartOpts.scaleFontStyle
                    },
                    gridLines: {
                        display: this.chartObj.chartOpts.scaleShowVerticalLines,
                        color: this.chartObj.chartOpts.scaleGridLineColor,
                        lineWidth: this.chartObj.chartOpts.scaleGridLineWidth
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        fontColor: this.chartObj.chartOpts.scaleFontColor,
                        fontFamily: this.chartObj.chartOpts.scaleFontFamily,
                        fontSize: this.chartObj.chartOpts.scaleFontSize,
                        fontStyle: this.chartObj.chartOpts.scaleFontStyle
                    },
                    ticks: {
                        beginAtZero: this.chartObj.chartOpts.scaleBeginAtZero,
                        fontColor: this.chartObj.chartOpts.scaleFontColor,
                        fontFamily: this.chartObj.chartOpts.scaleFontFamily,
                        fontSize: this.chartObj.chartOpts.scaleFontSize,
                        fontStyle: this.chartObj.chartOpts.scaleFontStyle
                    },
                    gridLines: {
                        display: this.chartObj.chartOpts.scaleShowHorizontalLines,
                        color: this.chartObj.chartOpts.scaleGridLineColor,
                        lineWidth: this.chartObj.chartOpts.scaleGridLineWidth
                    }
                }]
            };

            if (this.chartObj.chartOpts.scaleOverride) {
                var min = this.chartObj.chartOpts.scaleStartValue;
                var steps = this.chartObj.chartOpts.scaleSteps;
                var stepSize = this.chartObj.chartOpts.scaleStepWidth;
                var max = min + steps * stepSize;

                scalesConfig.yAxes[0].ticks.min = min;
                scalesConfig.yAxes[0].ticks.max = max;
                scalesConfig.yAxes[0].ticks.fixedStepSize = stepSize;
            }

            if (type === 'horizontalBar') {
                scalesConfig.yAxes[0].ticks.display = this.chartObj.chartOpts.scaleShowLabels;
                scalesConfig.yAxes[0].maxBarThickness = 48;
                scalesConfig.xAxes[0].ticks.callback = tickCallback.bind(this);
            } else {
                scalesConfig.xAxes[0].ticks.display = this.chartObj.chartOpts.scaleShowLabels;
                scalesConfig.xAxes[0].maxBarThickness = 48;
                scalesConfig.yAxes[0].ticks.callback = tickCallback.bind(this);
            }

            this.chartObj.chartOpts.scales = scalesConfig;
        },

        transformTooltips: function (type) {
            this.chartObj.chartOpts.tooltips = {
                mode: 'label',
                enabled: this.chartObj.chartOpts.showTooltips,
                titleFontFamily: this.chartObj.chartOpts.tooltipTitleFontFamily,
                titleFontSize: this.chartObj.chartOpts.tooltipTitleFontSize,
                titleFontStyle: this.chartObj.chartOpts.tooltipTitleFontStyle,
                titleFontColor: this.chartObj.chartOpts.tooltipTitleFontColor,
                bodyFontFamily: this.chartObj.chartOpts.tooltipFontFamily,
                bodyFontSize: this.chartObj.chartOpts.tooltipFontSize,
                bodyFontStyle: this.chartObj.chartOpts.tooltipFontStyle,
                bodyFontColor: this.chartObj.chartOpts.tooltipFontColor,
                bodySpacing: 4,
                cornerRadius: 4,
                multiKeyBackground: '#fff',
                callbacks: {
                    label: function (tooltipItem, data) {
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],
                            tooltipText = window.NumberFormatter.format(this.chartObj.service, value);
                        if (type === 'pie') {
                            tooltipText = data.labels[tooltipItem.index] + ': ' + tooltipText;
                        }
                        return tooltipText;
                    }.bind(this)
                }
            };
        },

        transformOptions: function (type) {
            this.transformAnimationConfig(type);
            this.transformLegendConfig(type);

            if (type !== 'pie') {
                this.transformScaleConfig(type);
            } else {
                var chartOpts = this.chartObj.chartOpts;
                chartOpts.cutoutPercentage = chartOpts.cutoutPercentage || chartOpts.percentageInnerCutout || 0;
            }
            this.transformTooltips(type);
        }
    };

    publicApi.init = function (chartObj) {
        return new Chart(chartObj);
    };

    return publicApi;
});
