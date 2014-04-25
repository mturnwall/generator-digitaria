module.exports = function (grunt) {
    'use strict';

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        yeoman: {
            // Configurable paths
            app: '.',
            dist: 'build'
        },

        /**
         * grunt-contrib-clean - Clean files and folders.
         *
         * @url     https://github.com/gruntjs/grunt-contrib-clean
         */
        clean: {
            build: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*'
                    ]
                }]
            },
            staging: {
                files: [{
                    dot:true,
                    src: [
                        '<%%= yeoman.dist %>/staging'
                    ]
                }]
            }
        },

        /**
         * grunt-contrib-copy - Copy files and folders.
         *
         * @url     https://github.com/gruntjs/grunt-contrib-copy
         */
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '{,*/}*.html',
                            'images/**/*',
                            'fonts/**/*',
                            'views/**/*.js'
                        ],
                        dest: '<%%= yeoman.dist %>'
                    }
                ]
            },
            unminified: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%%= yeoman.dist %>/staging/concat/css/**'],
                        dest: '<%%= yeoman.dist %>/css',
                        filter: 'isFile',
                        ext: '.css' // strips .min.js extension
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%%= yeoman.dist %>/staging/concat/js/**'],
                        dest: '<%%= yeoman.dist %>/js',
                        filter: 'isFile',
                        options : {
                            noProcess: '<%%= yeoman.dist %>/staging/concat/js/modernizr.js'
                        },
                        ext: '.js' // strips .min.js extension
                    }
                ]
            }
        },

        /**
         * grunt-contrib-jshint - Validate files with JSHint.
         *
         * @url     https://github.com/gruntjs/grunt-contrib-jshint
         */
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                // quotmark: true,
                unused: true,
                globals: {
                    jQuery: true
                },
                exported: ['trackingObj']
            },
            files: ['js/tpr.js', 'js/product_*.js', 'js/**/*.js']
        },

        /**
         * grunt-contrib-compass - Compile Sass to CSS using Compass
         *
         * @url     https://github.com/gruntjs/grunt-contrib-compass
         */
        compass: {
            options: {
                config: 'config.rb',
            },
            dev: {
                options: {
                    environment: 'development'
                }
            },
            build: {
                options: {
                    environment: 'production'
                }
            }
        },

        /**
         * grunt-contrib-handlebars - Precompile Handlebars templates to JST file.
         *
         * @url     https://github.com/gruntjs/grunt-contrib-handlebars
         */
        <% if (includeHandlebars) { %>
        handlebars: {
            compile: {
                options: {
                    namespace: 'Handlebars.templates',
                    processName: function (filePath) {
                        return filePath.replace(/^js\/templates\//, '').replace('.handlebars', '');
                    },
                    wrapped: true
                },
                files: [
                    {
                        src: ['js/templates/*.handlebars'],
                        dest: 'js/templates/all_templates.js'
                    }
                ]
            }
        }, <% } %>

        /**
         * grunt-usemin - Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views).
         * - Reads HTML for usemin blocks to enable smart builds that automatically concat, minify and (if using rev) revision files.
         *
         * @url     https://github.com/yeoman/grunt-usemin
         */
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>',
                staging: '<%%= yeoman.dist %>/staging'
            },
            html: 'index.html'
        },

        // Performs rewrites based on the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/css/{,*/}*.css']
        },

        /**
         * grunt-contrib-imagemin - Minify PNG, JPEG and GIF images
         *
         * @url     https://github.com/gruntjs/grunt-contrib-imagemin
         */
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: 'images',
                        src: ['**/*.png'],
                        dest: '<%%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        /**
         * grunt-svgmin - Minify SVG using SVGO
         *
         * @url     https://github.com/sindresorhus/grunt-svgmin
         */
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },

        // concat: {
        //     options: {
        //         separator: ';\n'
        //     },
        //     build: {
        //         files: [
        //             {src: ['js/tpr.js', 'js/product_*.js'], dest: 'build/js/<%%= pkg.name %>-<%%= pkg.version %>.js', nonull: true}
        //         ]
        //     }
        // },

        /**
         * grunt-modernizr - Build out a lean, mean Modernizr machine.
         *
         * @url     https://github.com/doctyper/grunt-modernizr
         */
        modernizr : {
            devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%%= yeoman.dist %>/js/modernizr.min.js',
            files: [
                '<%%= yeoman.dist %>/js/**/*.js',
                '<%%= yeoman.dist %>/css/{,*/}*.css'
            ],
            uglify: true
        },

        /**
         * grunt-contrib-watch - Run predefined tasks whenever watched file patterns are added, changed or deleted.
         *
         * @url     https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            css: {
                files: ['css/sass/**/*.scss'],
                tasks: ['compass:dev']
            },<% if (includeHandlebars) { %>
            handlebars: {
                files: ['views/*.handlebars'],
                tasks: ['handlebars:dev']
            },<% } %>
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '{,*/}*.html',
                    '{,*/}*.css',
                    'images/**/*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            },
            scripts: {
                files: ['<%%= jshint.files %>'],
                tasks: ['jshint']
            }
        },

        /**
         * grunt-contrib-connect - Start a connect web server.
         *
         * @url     https://github.com/gruntjs/grunt-contrib-connect
         */
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true
                }
            }
        },

        /**
         * grunt-concurrent - Run grunt tasks concurrently to speed up build process
         *
         * @url     https://github.com/sindresorhus/grunt-concurrent
         */
        concurrent: {
            dist: [
                'imagemin',
                'svgmin'
            ]
        }
    });
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'jshint',
        'compass:dev'<% if (includeHandlebars) { %>,
        'handlebars'<% } %>
    ]);

    grunt.registerTask('build', 'Production ready code', function(target) {
        if (target === 'drupal') {
            // TODO Drupal only tasks (no minify)
            // grunt.task.run([]);
        } else {
            grunt.task.run([
                'clean:build',
                'jshint',
                'useminPrepare',
                'concurrent:dist',
                'concat',
                'cssmin',
                'uglify',
                'copy:build',
                'modernizr',
                'usemin',
                'unminified'
            ]);
        }
    });

    grunt.registerTask('unminified', [
        'copy:unminified',
        'clean:staging'
    ]);

    grunt.registerTask('image', 'compress PNGs', [
        'imagemin'
    ]);

    grunt.registerTask('serve', 'You want fries with that?', [
        'compass:dev',
        'connect:livereload',
        'watch'
    ]);
};
