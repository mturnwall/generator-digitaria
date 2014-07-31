
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
            dev: 'dev',
            dist: 'build'
        },

        /**
         * grunt-contrib-compass - Compile Sass to CSS using Compass
         *
         * @url     https://github.com/gruntjs/grunt-contrib-compass
         */
        autoprefixer: {
            options: {
                browsers: ['last 3 version', 'ie 8', 'ie 9']
            },
            all: {
                files: [{
                    expand: true,
                    src: 'css/*.css',
                    dest: ''
                }]
            }
        },

        /**
         * grunt-bowercopy - Copy bower components into final locations
         *
         * @url     https://github.com/timmywil/grunt-bowercopy
         */
        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },
            js: {
                files: {
                    'js/libs': [
                        'jquery/dist/jquery.js'<% if (includeModernizr) { %>,
                        'modernizr/modernizr.js'<% } %><% if (includeUniform) { %>,
                        'jquery.uniform/jquery.uniform.js'<% } %>
                    ]
                }
            }
            // css: {
            //     files: {
            //         'css': ['normalize-css/normalize.css']
            //     }
            // }
        },

        /**
         * grunt-contrib-clean - Clean files and folders.
         *
         * @url     https://github.com/gruntjs/grunt-contrib-clean
         */
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*'
                    ]
                }]
            },
            dev: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= yeoman.dev %>'
                    ]
                }]
            }
        },

        /**
         * grunt-contrib-compass - Compile Sass to CSS using Compass
         *
         * @url     https://github.com/gruntjs/grunt-contrib-compass
         */
        compass: {
            options: {
                config: '<%%= yeoman.app %>/config.rb',
            },
            dev: {
                options: {
                    environment: 'development'
                }
            },
            dist: {
                options: {
                    environment: 'production'
                }
            }
        },

        /**
         * grunt-concat - Concatenate files
         *
         * @url     https://github.com/gruntjs/grunt-contrib-concat
         */
        concat: {
            dist: {
                options: {
                    separator: ';'
                },
                files: {
                    '<%%= yeoman.dist %>/js/libs.min.js': ['js/libs/*.js']
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

        cssmin: {
            combine: {
                files: {
                    '<%%= yeoman.dist %>/css/master.min.css': ['css/master.css']
                }
            }
        },

        /**
         * grunt-env - Specify an ENV configuration as a task
         *
         * @url     https://github.com/jsoverson/grunt-env
         */
        env: {
            dev: {
                NODE_ENV: 'dev'
            },
            production: {
                NODE_ENV: 'production'
            }
        },

        /**
         * grunt-contrib-jshint - Validate files with JSHint.
         *
         * @url     https://github.com/gruntjs/grunt-contrib-jshint
         */
        jshint: {
            options: {
                jshintrc: true
            },
            files: ['js/*.js']
        },

        <% if (includeHandlebars) { %>
        /**
         * grunt-contrib-handlebars - Precompile Handlebars templates to JST file.
         *
         * @url     https://github.com/gruntjs/grunt-contrib-handlebars
         */
        handlebars: {
            compile: {
                options: {
                    namespace: 'Handlebars.templates',
                    processName: function (filePath) {
                        return filePath.replace(/^js\/views\//, '').replace('.hbs', '');
                    },
                    wrapped: true
                },
                src: ['<%%= yeoman.app %>/js/views/*.hbs'],
                dest: '<%%= yeoman.app %>/js/views/all_templates.js'
            }
        }, <% } %>

        /**
         * grunt-contrib-imagemin - Minify PNG, JPEG and GIF images
         *
         * @url     https://github.com/gruntjs/grunt-contrib-imagemin
         */
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%%= yeoman.app %>/images'
                }]
            }
        },

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

        preprocess: {
            dev: {
                options: {
                    inline: true,
                    context: {
                        dev: true
                    }
                },
                files: {
                    '<%%= yeoman.dev %>/index.html': ['templates/index.tpl']
                }
            },
            prod: {
                options: {
                    inline: true,
                    context: {
                        production: true
                    }
                },
                files: {
                    '<%%= yeoman.dist %>/index.html': ['templates/index.tpl']
                }
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

        /**
         * grunt-contrib-uglif - Minify files with UglifyJS
         *
         * @url     https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            dist: {
                options: {
                    mangle: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    '<%%= yeoman.dist %>/js/<%%= slugProjectName%>.min.js': ['js/*.js'],
                    '<%%= yeoman.dist %>/js/libs.min.js': ['<%%= yeoman.dist %>/js/libs.min.js']
                }
            }
        },

        /**
         * grunt-contrib-watch - Run predefined tasks whenever watched file patterns are added, changed or deleted.
         *
         * @url     https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            options: {
                atBegin: true,
                debounceDelay: 200
            },
            css: {
                files: ['css/sass/**/*.scss'],
                tasks: ['compass:dev', 'autoprefixer:all', 'build-css']
            },<% if (includeHandlebars) { %>
            handlebars: {
                tasks: ['handlebars:compile'],
                files: ['<%%= handlebars.compile.src %>']
            },<% } %>
            js: {
                files: ['<%%= jshint.files %>'],
                tasks: ['jshint', 'build-js']
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

    grunt.registerTask('build-css', [
        'env:production',
        'cssmin'
    ]);

    grunt.registerTask('build-js', [
        'env:production',
        'uglify:dist'
    ]);

    grunt.registerTask('start', 'Setup the files for dev and start a watch task', [
        'env:dev',
        'clean:dev',
        'preprocess:dev',
        'preprocess:prod',
        'concat:dist',
        'watch'
    ]);

    grunt.registerTask('serve', 'You want fries with that?', [
        'compass:dev',
        'connect:livereload',
        'watch'
    ]);
};
