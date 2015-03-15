/*
 * grunt-elm
 * https://github.com/rfeldman/grunt-elm
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
