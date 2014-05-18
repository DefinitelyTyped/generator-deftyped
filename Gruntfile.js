module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-tslint');

    grunt.initConfig({
        ts: {
            build: {
                src: ['app/**/*.ts'],
                options: {
                    target: 'es3',
                    module: 'commonjs',
                    sourceMap: true,
                    declaration: false,
                    removeComments: true
                },
            }
        },
        jshint: {
            all: ['Gruntfile.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslintrc.json')
            },
            all: {
                src: ['app/**/*.ts']
            }
        }
    });

    grunt.registerTask('default', ['jshint:all', 'tslint:all', 'ts:build']);
};