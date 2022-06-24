var path = require("path");
var fs = require('fs');

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    lineNumbers: true,
                    includePaths: [
                        './browser/sass/',
                        './node_modules',
                        './node_modules/font-awesome/scss/'
                    ],
                    outputStyle: 'compact',
                    sourceMap: true,
                    'default-encoding': 'utf-8'
                },
                files: {
                    './browser/css/default.css': './browser/sass/default.scss'
                }
            }
        },

        cssmin: {
            clean: {
                options: {
                    report: 'min'
                },
                files: {
                    './browser/css/default.css': './browser/css/default.css'
                }
            }
        },

        watch: {
            sass: {
                files: ['./browser/sass/**/*.scss'],
                tasks: ['sass']
            },
            options: {
                livereload: {
                    host: 'localhost',
                    port: 35732
                }
            }
        },

        uglify: {
            bundle: {
                options: {
                    mangle: true,
                    compress: true,
                    beautify: false,
                    sourceMap: false,
                    preserveComments: false,
                    report: "min",
                    except: []
                },
                files: {
                    'browser/js/bundle.js': ['browser/js/bundle.js']
                }
            }
        },

        webpack: {
            bundle: {
                entry: path.resolve('./browser/src/main.js'),
                watch: true,
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            loader: 'babel-loader',
                            query: {
                                presets: ['es2015']
                            },
                            exclude: /node_modules|templates/
                        },
                        {
                            test: /\.html$/,
                            loader: 'html-loader'
                        },
                        {
                            test: /\.(eot|svg|ttf|woff|woff2)$/,
                            exclude: /node_modules/,
                            loader: 'file-loader'
                        }
                    ]
                },
                output: {
                    path: path.resolve("./browser/js/"),
                    publicPath: "/neat-form/js/",
                    filename: 'bundle.js'
                },
                resolveLoader: {
                    root: path.resolve('node_modules')
                },
                resolve: {
                    root: [
                        path.resolve('./browser/js/')
                    ],
                    extensions: [
                        '',
                        '.js',
                        '.json'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-keepalive');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('build', [
        'webpack',
        "uglify",
        'sass',
        "cssmin"
    ]);

    grunt.registerTask('dev', [
        "webpack",
        "keepalive"
    ]);

    grunt.registerTask('devCss', [
        "sass",
        "watch"
    ]);
};
