
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['build']
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        src: ['css/*.css', 'images/**/*', 'fonts/**/*', 'views/**/*.js'],
                        dest: 'build'
                    },
                ]
            }
        },
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
            files: ['js/tpr.js', 'js/product_*.js']
        },
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
        },{% if (handlebars) { %}
        handlebars: {
            compile: {
                options: {
                    namespace: "Handlebars.templates",
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
        },{% } %}
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
                        dest: 'build/images'
                    }
                ]
            }
        },
        concat: {
            options: {
                separator: ';\n'
            },
            build: {
                files: [
                    {src: ['js/tpr.js', 'js/product_*.js'], dest: 'build/js/<%= pkg.name %>-<%= pkg.version %>.js', nonull: true}
                ]
            }
        },
        watch: {
            options: {
                atBegin: true
            },
            css: {
                files: ['css/sass/**/*.scss'],
                tasks: ['compass:dev']
            },{% if (handlebars) { %}
            handlebars: {
                files: ['views/*.handlebars'],
                tasks: ['handlebars:dev']
            },{% } %}
            scripts: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            }
        }
    });
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-compass');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'compass:dev', 'handlebars']);
    grunt.registerTask('build', 'Production ready code', ['clean', 'jshint', 'concat:build', 'compass:build', 'copy', 'imagemin']);
    grunt.registerTask('image', 'compress PNGs', ['imagemin']);
};
