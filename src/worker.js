'use strict'

const path = require('path')
const util = require('util')
const fs = require('fs')

const mkdirp = require('mkdirp')
const zopfli = require('@gfx/zopfli')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

async function zopfliCompressFile (from, to, options) {
  const toDir = path.dirname(to)
  await mkdirp(toDir)

  const content = await readFileAsync(from)
  const compressed = await zopfli.gzipAsync(content, options)
  await writeFileAsync(to, compressed)
}

module.exports = async function ({ from, to, options = {} }) {
  return zopfliCompressFile(from, to, options)
}
