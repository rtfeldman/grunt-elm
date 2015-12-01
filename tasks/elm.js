'use strict';

module.exports = function(grunt) {
  var _          = require('lodash');
  var elmCompile = require("node-elm-compiler").compile;

  var defaultOptions = {
    yes: true
  };

  grunt.registerMultiTask('elm', 'Compile Elm files to JavaScript.', function() {
    compileAll(this.files, this.options(defaultOptions), this.async());
  });

  function compile(sources, options, spawnOptions, callback) {
    function spawn(cmd, args) {
      return grunt.util.spawn({
        cwd: process.cwd(),
        cmd: cmd,
        args: args,
        options: spawnOptions
      }, function(err, result, exitCode) {
        // Log any stdout using grunt.log.ok and any stderr using grunt.log.error
        _.each({ok: result.stdout, error: result.stderr}, function(output, logType) {
          if (output && output.length > 0) {
            grunt.log[logType](output);
          }
        });

        callback(err);
      })
    };

    return elmCompile(sources, _.defaults({spawn: spawn}, options));
  }

  function compileAll(files, options, callback) {
    if (files.length === 0) {
      return callback();
    } else {
      var file         = _.head(files);
      var validSources = file.src.filter(isValidFilepath);
      var compileOpts  = _.defaults({output: file.dest}, options);

      return compile(validSources, compileOpts, options, function(err) {
        if (err) {
          callback(err);
        } else {
          compileAll(_.tail(files), options, callback);
        }
      });
    }
  }

  function isValidFilepath(filepath) {
    var fileExists = grunt.file.exists(filepath);

    if (!fileExists) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
    }

    return fileExists
  }
};
