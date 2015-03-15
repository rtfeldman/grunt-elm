# grunt-elm
> Compile Elm files to JavaScript. [![build status][1]][2] [![NPM version][3]][4]

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

#### yes
Type: `Boolean`
Default: true

Automatically answer `yes` to any prompts that come up during the build.

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

### Changelog

#### 1.0.0

* Switches to using [node-elm-compiler](https://github.com/rtfeldman/node-elm-compiler) under the hood.
* The `yesToAllPrompts` option is now called `yes` and defaults to `true`.

#### 0.4.0

Initial release.

[1]: https://secure.travis-ci.org/rtfeldman/grunt-elm.svg
[2]: https://travis-ci.org/rtfeldman/grunt-elm
[3]: https://badge.fury.io/js/grunt-elm.svg
[4]: https://badge.fury.io/js/grunt-elm
