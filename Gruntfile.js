'use strict';

module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            less: {
                files: ['<%= config.app %>/styles/{,*/}*.less'],
                tasks: ['autoprefixer']
            }
        },

        // Compiles LESS to CSS and generates necessary files if requested
        less: {
            dist: {
                options: {
                    cleancss: true,
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: '*.less',
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/scripts/scripts.js': [
                        '<%= config.dist %>/scripts/scripts.js'
                    ]
                }
            }
        },
    });

    grunt.registerTask('build', [
        'autoprefixer',
        'uglify'
    ]);

    grunt.registerTask('default', ['autoprefixer', 'uglify']);
};
