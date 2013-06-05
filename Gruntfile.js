module.exports = function(grunt) {
  var Globule = require('globule'),
      File = require('fs'),
      Path = require('path');

  this.registerTask('default', ['server']);
  this.registerTask('server', ['concat', 'jsframe', 'connect', 'watch']);

  this.registerMultiTask('jsframe', 'build polyglot files', function () {
    var jsfPath = require.resolve('./lib/jsframe'),
        jsf,
        dest = this.data.dest,
        src = this.data.src;

    delete require.cache[jsfPath];
    jsf = require('./lib/jsframe');

    src.forEach( function(pattern) {
      var files = Globule.find(pattern);
      files.forEach( function(filePath) {
        var basename = Path.basename(filePath),
            targetName = Path.join(dest, basename) + '.html',
            outFd = File.openSync(targetName, 'w');

        console.log(filePath + " → " + targetName);
        jsf.process(filePath, outFd);
        File.close(outFd);
      });
    });
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {},

      options: {
        port: 9292,
        base: '.',
        hostname: '*'
      }
    },

    watch: {
      files: ['lib/**', 'vendor/*', 'test/tests/*', 'test/fixtures-poly/*'],
      tasks: ['concat:tests', 'jsframe']
    },

    clean: ["dist"],

    jsframe: {
      tests: {
        src: ['test/fixtures-poly/*'],
        dest: 'tmp'
      }
    },

    concat: {
      jsframe: {
        src: ['lib/*.js'],
        dest: 'tmp/jsframe.js'
      },

      tests: {
        src: ['test/tests/*'],
        dest: 'tmp/<%= pkg.name %>-tests.js'
      }
    },

    jshint: {
      options: {
        jshintrc: './.jshintrc'
      },
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/tests/**/*.js']
    }
  });

  // Load tasks from npm
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
