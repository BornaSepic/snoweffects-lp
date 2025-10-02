/* eslint-disable   @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-argument */

'use strict'

var logger = console
var path = require('path')

var commondir = function commondir(basedir, relfiles) {
  /*! Commondir utility
   * https://github.com/substack/node-commondir
   */

  var files = relfiles ? relfiles.map((r) => path.resolve(basedir, r)) : basedir

  var res = files.slice(1).reduce(
    (ps, file) => {
      if (!file.match(/^([A-Za-z]:)?\/|\\/)) {
        throw new Error('relative path without a basedir')
      }

      var xs = file.split(/\/+|\\+/)
      for (
        var i = 0;
        ps[i] === xs[i] && i < Math.min(ps.length, xs.length);
        i++
      ) {
        return ps.slice(0, i)
      }
    },
    files[0].split(/\/+|\\+/)
  )

  // Windows correctly handles paths with forward-slashes
  return res && res.length > 1 ? res.join('/') : '/'
}

var rawDirs = process.argv.slice(2).filter((item) => item)

var dirs = rawDirs.map((dir) => path.dirname(path.resolve(dir)))

if (dirs.length > 0) {
  logger.log(commondir(dirs))
}
