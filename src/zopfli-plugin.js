'use strict'

const glob = require('glob')
const path = require('path')
const util = require('util')

const Piscina = require('piscina')

const defaultOptions = {
  cwd: path.join(process.cwd(), 'public'),
  extensions: ['css', 'js'],
  path: ''
}

const globAsync = util.promisify(glob)

async function onPostBuild ({ reporter }, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }

  // get the files
  const patternExt = (options.extensions.length > 1) ? `{${options.extensions.join(',')}}` : options.extensions[0]
  const pattern = `**/*.${patternExt}`
  const globResult = await globAsync(pattern, { cwd: options.cwd, ignore: '**/*.gz', nodir: true })
  const files = globResult.map(res => {
    return {
      from: path.join(options.cwd, res),
      to: path.join(options.cwd, options.path, `${res}.gz`),
      options
    }
  })

  // compress using worker pool
  const pool = new Piscina({ filename: path.resolve(__dirname, 'worker.js') })
  const compress = files.map(file => pool.runTask(file))
  await Promise.all(compress)

  reporter.info(`Zopfli compressed ${pool.completed} files - ${(pool.duration / 1000).toFixed(3)}s - ${(pool.runTime.average / 1000).toFixed(3)}/s`)
}

exports.onPostBuild = onPostBuild

// async function onPostBuild ({ reporter }, pluginOptions) {
//   const options = { ...defaultOptions, ...pluginOptions }
//   const fileBasePath = path.join(process.cwd(), 'public')
//   const patternExt = (options.extensions.length > 1) ? `{${options.extensions.join(',')}}` : options.extensions[0]
//   const pattern = `**/*.${patternExt}`

//   const files = await globAsync(pattern, { cwd: fileBasePath, ignore: '**/*.gz', nodir: true })

//   const compressFile = workerFarm(worker)

//   const activity = reporter.activityTimer('Zopfli compression')
//   activity.start()

//   let totalCompressed = 0
//   let totalSavings = 0
//   const compress = files.map(file => {
//     return new Promise((resolve, reject) => {
//       compressFile(file, pluginOptions, (details, err) => {
//         if (err) {
//           reporter.panicOnBuild(`Zopfli compression failed ${err}`)
//           reject(err)
//         }
//         if (pluginOptions.verbose) {
//           reporter.verbose(`${file} - original size: ${bytesToSize(details.originalSize)} compressed size: ${bytesToSize(details.compressedSize)}`)
//         }
//         totalSavings += (details.originalSize - details.compressedSize)
//         activity.setStatus(` ${file} ${++totalCompressed}/${files.length}`)
//         resolve()
//       })
//     })
//   })
//   await Promise.all(compress)
//   workerFarm.end(compressFile)

//   activity.setStatus(` ${totalCompressed}/${files.length}`)
//   activity.end()

//   reporter.info(`Zopfli compression total payload reduced ${bytesToSize(totalSavings)}`)
// }

// // courtesy https://web.archive.org/web/20120507054320/http://codeaid.net/javascript/convert-size-in-bytes-to-human-readable-format-(javascript)
// const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
// const bytesToSize = (bytes) => {
//   if (bytes < 2) return `${bytes} Byte`
//   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
//   return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`
// }

// exports.onPostBuild = onPostBuild
