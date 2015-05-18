/*
 * grunt-elm
 * https://github.com/rfeldman/grunt-elm
 *
 * Copyright (c) 2014 Richard Feldman
 * Licensed under the Apache2 license.
 */

'use strict';

module.exports = function(grunt) {
  var defaultTestOptions = {
    yes: true
  }

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'elm-stuff']
    },

    // Configuration to be run (and then tested).
    elm: {
      oneFile: {
        options: defaultTestOptions,
        files: {
          'tmp/testOutput.js': ['test/fixtures/TestHelloWorld.elm']
        }
      },
      twoFiles: {
        options: defaultTestOptions,
        files: {
          'tmp/testOutput.js': ['test/fixtures/TestA.elm', 'test/fixtures/TestB.elm'],
        }
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*Test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'elm', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
