define(['chartjs'], function (chartjs) {
    'use strict';
    var publicApi = {};

    publicApi.chartjs = {};

    publicApi.chartjs.vertical_bar_chart_default = {
        data:             {
            labels : ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [[65, 59, 90, 81, 56, 55, 40]]
        },
        domElementId:     'chart_1',
        chartLibraryName: 'chartjs',
        chartLibrary:     chartjs,
        chartType:        'chartjs' + '-' + 'vertical-bar',
        chartOpts:  {},
        customDatasetOpts: []
    };


    publicApi.chartjs.vertical_bar_chart_multiple_datasets = {
        data:             {
            labels : ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                [65, 59, 90, 81, 56, 55, 40],
                [20, 30, 40, 13, 7, 95, 103]
            ]
        },
        domElementId:     'chart_2',
        chartLibraryName: 'chartjs',
        chartLibrary:     chartjs,
        chartType:        'chartjs' + '-' + 'vertical-bar',
        chartOpts:  {},
        customDatasetOpts: []
    };

    publicApi.chartjs.vertical_bar_chart_default_custom_opts = {
        data:             {
            labels : ['Vienna', 'Zurich', 'Auckland', 'Munich', 'Vancouver', 'Dusseldorf', 'Frankfurt'],
            datasets: [[65, 59, 90, 81, 56, 55, 40]]
        },
        domElementId:     'chart_3',
        chartLibraryName: 'chartjs',
        chartLibrary:     chartjs,
        chartType:        'chartjs' + '-' + 'vertical-bar',
        chartOpts:  {
            scaleGridLineColor: 'grey',
            scaleGridLineWidth : 0.5,
            barValueSpacing : 15,
            barStrokeWidth : 0.5
        },
        customDatasetOpts: [
            {
                label: 'Best Cities To Live',
                fillColor: 'black',
                strokeColor: 'black',
                highlightFill: 'black',
                highlightStroke: 'black'
            }
        ]
    };

    publicApi.chartjs.vertical_bar_chart_multiple_datasets_custom_opts = {
        data:             {
            labels : ['Google', 'The Boston Consulting Group', 'Acuity', 'SAS institute', 'Edward Jones', 'Salesforce', 'Genentech'],
            datasets: [
                [65, 59, 90, 81, 56, 55, 40],
                [20, 30, 40, 13, 7, 95, 100],
                [90, 80, 70, 73, 69, 95, 50]
            ]
        },
        domElementId:     'chart_4',
        chartLibraryName: 'chartjs',
        chartLibrary:     chartjs,
        chartType:        'chartjs' + '-' + 'vertical-bar',
        chartOpts:  {
            scaleGridLineColor: 'black',
            scaleGridLineWidth : 1,
            barValueSpacing : 5,
            barStrokeWidth : 2,
            scaleShowVerticalLines: false,
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        },
        customDatasetOpts: [
            {
                label: 'Company health: England',
                fillColor: 'red',
                strokeColor: 'red',
                highlightFill: 'red',
                highlightStroke: 'red'
            },
            {
                label: 'Company health: Wales',
                fillColor: 'blue',
                strokeColor: 'blue',
                highlightFill: 'blue',
                highlightStroke: 'blue'
            },
            {
                label: 'Company health: USA',
                fillColor: 'black',
                strokeColor: 'black',
                highlightFill: 'black',
                highlightStroke: 'black'
            }
        ]
    };

    publicApi.chartjs.line_chart_default = {
        data:             {
            labels : ['BP', 'Barclays', 'GlaxoSmithKline', 'AstraZeneca', 'HSBC Holdings', 'Lloyds Banking Group', 'Vodafone'],
            datasets: [[239.27, 65.91, 45.83, 32.8, 103.74, 106.67, 58.35]]
        },
        domElementId:     'chart_5',
        chartLibraryName: 'chartjs',
        chartLibrary:     chartjs,
        chartType:        'chartjs' + '-' + 'line',
        chartOpts:  {},
        customDatasetOpts: []
    };

    publicApi.chartjs.line_chart_multiple_datasets = {
        data:             {
            labels : ['BP', 'Barclays', 'GlaxoSmithKline', 'AstraZeneca', 'HSBC Holdings', 'Lloyds Banking Group', 'Vodafone'],
            datasets: [
                [239.27, 65.91, 45.83, 32.8, 103.74, 106.67, 58.35],
                [139.27, 25.91, 15.83, 30.8, 107.74, 109.67, 98.35]
            ]
        },
        domElementId:     'chart_6',
        chartLibraryName: 'chartjs',
        chartLibrary:     chartjs,
        chartType:        'chartjs' + '-' + 'line',
        chartOpts:  {},
        customDatasetOpts: []
    };

    publicApi.chartjs.line_chart_default_custom_opts = {
        data:             {
            labels : ['BP', 'Barclays', 'GlaxoSmithKline', 'AstraZeneca', 'HSBC Holdings', 'Lloyds Banking Group', 'Vodafone'],
            datasets: [[239.27, 65.91, 45.83, 32.8, 103.74, 106.67, 58.35]]
        },
        domElementId:     'chart_7',
        chartLibraryName: 'chartjs',
        chartLibrary:     chartjs,
        chartType:        'chartjs' + '-' + 'line',
        chartOpts:  {
            bezierCurve: false,
            scaleShowHorizontalLines: false,
            pointDotRadius : 5
        },
        customDatasetOpts: [
            {
                label: 'Sales in Billions',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'blue',
                pointColor: 'black',
                pointStrokeColor: 'white',
                pointHighlightFill: 'blue',
                pointHighlightStroke: 'blue'
            }
        ]
    };

    publicApi.chartjs.line_chart_multiple_datasets_custom_opts = {
        data:             {
            labels : ['BP', 'Barclays', 'GlaxoSmithKline', 'AstraZeneca', 'HSBC Holdings', 'Lloyds Banking Group', 'Vodafone'],
            datasets: [
                [239.27, 65.91, 45.83, 32.8, 103.74, 106.67, 58.35],
                [139.27, 25.91, 15.83, 30.8, 107.74, 109.67, 98.35]
            ]
        },
        domElementId:     'chart_8',
        chartLibraryName: 'chartjs',
        chartLibrary:     chartjs,
        chartType:        'chartjs' + '-' + 'line',
        chartOpts:  {
            bezierCurve: false,
            scaleShowHorizontalLines: false,
            scaleShowVerticalLines: false,
            pointDotRadius : 3,
            datasetFill : false,
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        },
        customDatasetOpts: [
            {
                label: 'Sales in Billions: 2014',
                strokeColor: 'blue',
                pointColor: 'blue',
                pointStrokeColor: 'blue',
                pointHighlightFill: 'blue',
                pointHighlightStroke: 'blue'
            },
            {
                label: 'Sales in Billions: 2015',
                strokeColor: 'red',
                pointColor: 'red',
                pointStrokeColor: 'red',
                pointHighlightFill: 'red',
                pointHighlightStroke: 'red'
            }
        ]
    };

    publicApi.chartjs.pie_chart_default = {
        data:             {
            labels : ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [[65, 59, 90, 81, 56, 55, 40]]
        },
        domElementId:     'chart_9',
        chartLibraryName: 'chartjs',
        chartLibrary:     chartjs,
        chartType:        'chartjs' + '-' + 'pie',
        chartOpts:  {},
        customDatasetOpts: []
    };

    publicApi.chartjs.pie_chart_custom_opts = {
        data:             {
            labels : ['Apple', 'Google', 'Facebook', 'Microsoft'],
            datasets: [[30, 40, 15, 15]]
        },
        domElementId:     'chart_10',
        chartLibraryName: 'chartjs',
        chartLibrary:     chartjs,
        chartType:        'chartjs' + '-' + 'pie',
        chartOpts:  {},
        customDatasetOpts: [
            {
                label: 'Apple',
                color: 'black',
                highlight: 'black'
            },
            {
                label: 'Google',
                color: 'green',
                highlight: 'green'
            },
            {
                label: 'Facebook',
                color: 'red',
                highlight: 'red'
            },
            {
                label: 'Microsoft',
                color: 'blue',
                highlight: 'blue'
            }
        ]
    };

    return publicApi;
});
