# grunt-elm
> Compile Elm files to JavaScript.

[![build status][1]][2] [![NPM version][3]][4]

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-elm --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-elm');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-coffee/tree/grunt-0.3-stable).*

### Options

#### srcDir
Type: `String`
Default: none

Additional source directories searched when using `compileDependencies`.

#### cacheDir
Type: `String`
Default: delegate to Elm compiler's default (currently `cache/`)

Directory for files cached to make builds faster.

#### compileDependencies
Type: `boolean`
Default: `true`

Automatically compile dependencies.

#### bundleRuntime
Type: `boolean`
Default: `false`

Bundle the runtime with the generated html or js to create a standalone file.

#### onlyJS
Type: `boolean`
Default: `true`

Compile only to JavaScript. (Do not create other output, such as HTML.)

#### noPrelude
Type: `boolean`
Default: `false`

Do not import Prelude by default. Used only when compiling standard libraries.

### Usage Examples

```js
elm: {
  compile: {
    files: {
      'output-dir/': 'path/to/Source.elm',
      'other-output-dir/': ['path/to/sources/*.elm', 'path/to/more/*.elm']
    }
  },
```

[1]: https://secure.travis-ci.org/rtfeldman/grunt-elm.svg
[2]: https://travis-ci.org/rtfeldman/grunt-elm
[3]: https://badge.fury.io/js/grunt-elm.svg
[4]: https://badge.fury.io/js/grunt-elm