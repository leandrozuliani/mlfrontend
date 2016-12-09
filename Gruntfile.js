'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-postcss');
  
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
      useminPrepare: 'grunt-usemin'
  });

  var config = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({

    config: config,

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      babel: {
        files: ['app/assets/js/{,*/}*.js'],
        tasks: ['babel:dist']
      },
      babelTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['babel:test', 'test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['app/assets/css/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'postcss:dist']
      },
      styles: {
        files: ['app/assets/css/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'postcss:dist']
      }
    },

    browserSync: {
      options: {
        notify: false,
        background: true
      },
      livereload: {
        options: {
          files: [
            'app/{,*/}*.html',
            '.tmp/styles/{,*/}*.css',
            'app/assets/images/{,*/}*',
            '.tmp/scripts/{,*/}*.js'
          ],
          port: 9000,
          server: {
            baseDir: ['.tmp', config.app],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      test: {
        options: {
          port: 9001,
          open: false,
          logLevel: 'silent',
          host: 'localhost',
          server: {
            baseDir: ['.tmp', './test', config.app],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      dist: {
        options: {
          background: false,
          server: 'dist'
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    eslint: {
      target: [
        'Gruntfile.js',
        'app/assets/js/{,*/}*.js',
        '!app/assets/js/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= browserSync.test.options.host %>:<%= browserSync.test.options.port %>/index.html']
        }
      }
    },

    babel: {
      options: {
          sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/assets/js',
          src: '{,*/}*.js',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.js',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },

     //Start sass configuration
    sass: {

      options: {  
        sourcemap: 'none'
      },

      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['app/assets/css/*.scss', '!app/assets/css/_*.scss'],
          dest: 'dist/',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: ['last 1 version']}),
          require('cssnano')()
        ]
      },
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['dist/*.css'],
          dest: 'dist/',
          ext: '.min.css'
        }]
      }
    },
    wiredep: {
      app: {
        src: ['app/index.html'],
        ignorePath: /^(\.\.\/)*\.\./,
        options: {
          overrides: {
            'tiny.js': {
              main: "dist/tiny.js"
            }
          }
        }
      },
      sass: {
        src: ['app/assets/css/{,*/}*.{scss,sass}'],
        ignorePath: /^(\.\.\/)+/
      }
    },

    filerev: {
      dist: {
        src: [
          'dist/scripts/{,*/}*.js',
          'dist/assets/css/{,*/}*.css',
          'dist/assets/images/{,*/}*.*',
          'dist/assets/css/fonts/{,*/}*.*',
          'dist/*.{ico,png}'
        ]
      }
    },

    useminPrepare: {
      options: {
        dest: 'dist'
      },
      html: 'app/index.html'
    },

    usemin: {
      options: {
        assetsDirs: [
          'dist',
          'dist/assets/images',
          'dist/assets/css'
        ]
      },
      html: ['dist/{,*/}*.html'],
      css: ['dist/assets/css/{,*/}*.css']
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/assets/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: 'dist/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/assets/images',
          src: '{,*/}*.svg',
          dest: 'dist/assets/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: false,
          removeEmptyAttributes: false,
          removeOptionalTags: true,
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: '{,*/}*.html',
          dest: 'dist'
        }]
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['bower_components/chico/dist/ui/chico.js', 'app/assets/js/{,*/}*.js', 'app/assets/js/*.js'],
        dest: 'dist/script.js',
      },
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.{webp,jpg}',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        },{
          expand: true,
          dot: true,
          cwd: 'bower_components/chico/dist',
          src: ['app/assets/*.*'],
          dest: 'dist'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
           expand: true,
           cwd: 'app/assets/css',
           src: ['*.css', '!*.min.css'],
           dest: 'dist',
           ext: '.min.css'
        }]
      }
    },

    concurrent: {
      server: [
        'babel:dist',
        'sass:server'
      ],
      test: [
        'babel'
      ],
      dist: [
        'babel',
        'sass'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');


  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'postcss:dist',
    'concat',
    'sass',
    'postcss',
    'cssmin',
    'copy:dist',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

};