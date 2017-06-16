const path = require("path");
const webpack = require("webpack");
const WebpackChunkHash = require("webpack-chunk-hash");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// possible flag for detecting production, not sure what i wanna do there yet
const packingForProduction = process.argv.indexOf('-p') !== -1;

let config = {
  entry: {
    application: __dirname + '/app/assets/javascripts/application.js',
    vendor:      __dirname + '/vendor/assets/javascripts/vendor.js'
  },

  output: {
    path: __dirname + "/public/",
    filename:      packingForProduction ? "javascripts/[name]_[chunkhash].js" : "javascripts/[name].js",
    chunkFilename: packingForProduction ? "javascripts/[name]_[chunkhash].js" : "javascripts/[name].js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: __dirname + "/app/assets/javascripts/webpack",
        loader: "babel-loader",
        query: {
          presets: [["es2015", { "modules": false }], "react", "stage-2"]
        }
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        })
      },

      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader']
        })
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
         }
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: packingForProduction ? 'stylesheets/[name]_[contenthash].css' : 'stylesheets/[name].css',
      allChunks: true,
    }),

    function () {
      this.plugin("done", function (stats) {
        let _stats = stats.toJson()
        let manifest = { css: {}, js: {} };

        for (let key of Object.keys(_stats.assetsByChunkName)) {
          for (let asset of _stats.assetsByChunkName[key]) {
            if (asset.endsWith('.js'))  { manifest.js[key] = asset; }
            if (asset.endsWith('.css')) { manifest.css[key] = asset; }
          }
        }

        require("fs").writeFileSync(
          path.join(__dirname, "public/manifest.json"),
          JSON.stringify(manifest)
        );
      })
    }
  ]
};

// plugins we add in production packing
if (packingForProduction) {
  config.plugins.unshift(
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor"],
      minChunks: Infinity,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash()
  );
}
else {
  config.plugins.unshift(
    new webpack.NamedModulesPlugin()
  );
}

module.exports = config;
