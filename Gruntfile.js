module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.initConfig({

        jasmine: {
            src: 'chartRenderer.js',
            options: {
                keepRunner: true,
                specs: 'tests/*Spec.js',
                template: require('grunt-template-jasmine-requirejs'),
                outfile: '_SpecRunner.html',
                templateOptions: {
                    requireConfig: {
                        baseUrl: './',
                        paths: {
                            newsVjChartRenderer: 'newsVjChartRenderer',
                            chartJsRenderingModule: 'chartRenderingModules/chartjsRendererV2',
                            fixtureData: 'examples/fixtureData/fixtureData',
                            chartjs: 'examples/js/libs/chartjs/Chart.min'
                        }
                    }
                }
            }
        },

        watch: {
            scripts: {
                files: ['chartRenderer.js', 'tests/*.js'],
                tasks: ['default']
            }
        },

        jslint: {
            client: {
                src: [
                    'Gruntfile.js',
                    'newsVjChartRenderer.js',
                    'chartRenderingModules/chartjsRendererV2.js',
                    'examples/js/app.js',
                    'examples/fixtureData/fixtureData.js',
                    'tests/chartRendererSpec.js'
                ],
                directives: {
                    browser: true,
                    predef: [
                        'module',
                        'require',
                        'requirejs',
                        'define',
                        'console',
                        'it',
                        'describe',
                        'expect'
                    ]
                },
                options: {
                    junit: 'out/client-junit.xml'
                }
            }
        }

    });

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('default', ['jslint', 'jasmine']);
};
