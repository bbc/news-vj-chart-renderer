module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        jasmine: {
            src: 'chartRenderer.js',
            options: {
                keepRunner: false,
                specs: 'tests/*Spec.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: './',
                        paths: {
                            'chartRenderer': './chartRenderer'
                        }
                    }
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'chartRenderer.js', 'tests/*.js']
        },

        watch: {
            scripts: {
                files: ['chartRenderer.js', 'tests/*.js'],
                tasks: ['default']
            },
        }

    });

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('default', ['jshint', 'test']);
};
