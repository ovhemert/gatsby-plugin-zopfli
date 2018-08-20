'use strict'

const defaultOptions = {
  extensions: ['css', 'js']
}

const PluginZopfli = require('./src/zopfli-plugin')

exports.onCreateWebpackConfig = ({ stage, getConfig, rules, loaders, actions }, pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions
  }
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new PluginZopfli.WebpackPlugin(options)
      ]
    })
  }
}

exports.onPostBuild = PluginZopfli.onPostBuild
