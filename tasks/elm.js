/*
 * grunt-elm
 * https://github.com/rfeldman/grunt-elm
 *
 * Copyright (c) 2014 Richard Feldman
 * Licensed under the Apache2 license.
 */

'use strict';

module.exports = function(grunt) {
  var _ = require('lodash');
  var defaultOptions = {
    yesToAllPrompts: false
  };

  grunt.registerMultiTask('elm', 'Compile Elm files to JavaScript.', function() {
    compileAll(this.files, this.options(defaultOptions), this.async());
  });

  function compileAll(files, options, callback) {
    if (files.length === 0) {
      return callback();
    } else {
      var file         = _.head(files);
      var validSources = file.src.filter(isValidFilepath);

      return compile(validSources, file.dest, options, function(err) {
        if (err) {
          callback(err);
        } else {
          compileAll(_.tail(files), options, callback);
        }
      });
    }
  }

  function compile(sources, dest, options, callback) {
    var destArgs = dest ? ["--output", escapePath(dest)] : []
    var args = sources.concat(destArgs).concat(compilerArgsFromOptions(options));

    return grunt.util.spawn({
      cmd: "elm-make",
      args: args,
      options: {cwd: process.cwd()}
    }, function (err, result, exitCode) {
      // Log any stdout using grunt.log.ok and any stderr using grunt.log.error
      _.each({ok: result.stdout, error: result.stderr}, function(output, logType) {
        if (output && output.length > 0) {
          grunt.log[logType](output);
        }
      });

      callback(err);
    });
  }

  function isValidFilepath(filepath) {
    var fileExists = grunt.file.exists(filepath);

    if (!fileExists) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
    }

    return fileExists
  }

  function compilerArgsFromOptions(options) {
    return _.compact(_.map(options, function(value, opt) {
      if (value) {
        switch(opt) {
          case "yesToAllPrompts": return "--yes";
          default:
            grunt.log.warn('Unknown option: ' + opt);
            return null;
        }
      } else {
        return null;
      }
    }));
  }

  function escapePath(pathStr) {
    return pathStr.replace(/ /g, "\\ ");
  }
};
