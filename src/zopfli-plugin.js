'use strict'

const fs = require('fs')
const path = require('path')
const util = require('util')
const zopfli = require('@gfx/zopfli')

let assetsCompress = {}

class WebpackPlugin {
  constructor (options) {
    this.options = options
  }
  afterOptimizeAssets (assets) {
    Object.keys(assets).forEach(file => {
      if (file.endsWith('.css') || file.endsWith('.js')) {
        assetsCompress[`/${file}`] = {}
      }
    })
  }
  afterPlugins (compiler) {
    compiler.hooks.thisCompilation.tap('PluginZopfli', this.thisCompilation.bind(this))
  }
  apply (compiler) {
    compiler.hooks.afterPlugins.tap('PluginZopfli', this.afterPlugins.bind(this))
  }
  thisCompilation (compilation) {
    compilation.hooks.afterOptimizeAssets.tap('PluginZopfli', this.afterOptimizeAssets.bind(this))
  }
}

async function compressFile (file) {
  // zopfli-gzip the asset to a new file with the .gz extension
  const readFileAsync = util.promisify(fs.readFile)
  const writeFileAsync = util.promisify(fs.writeFile)

  const filePath = path.join(process.cwd(), 'public', file)
  const content = await readFileAsync(filePath)
  const compressed = await zopfli.gzipAsync(content, {})
  const newFileName = filePath + '.gz'
  await writeFileAsync(newFileName, compressed)
}

function onPostBuild (args, pluginOptions) {
  // after asset files have been generated, compress them
  const compress = Object.keys(assetsCompress).map(file => {
    return compressFile(file)
  })
  return Promise.all(compress)
}

module.exports.WebpackPlugin = WebpackPlugin
module.exports.onPostBuild = onPostBuild
