module.exports = function(grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-ts');

    grunt.initConfig({
        ts: {
            build: {
                src: ["app/**/*.ts"],
                options: {
                    target: 'es3',
                    module: 'commonjs',
                    sourceMap: true,
                    declaration: false,
                    removeComments: true
                },
            }
        }
    });

    grunt.registerTask("default", ["ts:build"]);
};