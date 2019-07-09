// Important modules this config uses
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const OfflinePlugin = require('offline-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const RemoveServiceWorkerPlugin = require('webpack-remove-serviceworker-plugin')

module.exports = require('./webpack.base.prod')({
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'app/app.js')
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js'
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    /*
     // 一旦外して検証します。
     new OfflinePlugin({
     relativePaths: false,
     publicPath: '/cc',

     // No need to cache .htaccess. See http://mxs.is/googmp,
     // this is applied before any match in `caches` section
     excludes: ['.htaccess'],

     caches: {
     main: [':rest:'],

     // All chunks marked as `additional`, loaded after main section
     // and do not prevent SW to install. Change to `optional` if
     // do not want them to be preloaded at all (cached only when first loaded)
     additional: ['js/*.chunk.js']
     },

     // Removes warning for about `additional` section usage
     safeToUseOptionalCaches: true,

     AppCache: false
     })
     */
    // Remove Service Worker
    new RemoveServiceWorkerPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    // new webpack.IgnorePlugin(/\.\/locale$/),
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],

  performance: {
    assetFilter: assetFilename => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename))
  }
})
