const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
  entry: {
    application_css: __dirname + '/app/assets/stylesheets/application.scss'
  },

  output: {
    path: __dirname + "/public/",
    filename: "javascripts/[name]_bundle.js"
  },

  module: {
    rules: [
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
      filename: 'stylesheets/[name]_bundle.css',
      allChunks: true,
    }),
  ]
};

module.exports = config;
