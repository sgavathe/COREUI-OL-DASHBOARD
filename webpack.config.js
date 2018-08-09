const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
//const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//const svgreact = require('svg-react-loader');


module.exports = {
  entry: [
    'react-hot-loader/patch','whatwg-fetch',
     './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/getstats/build/dashboard/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    hot: true,
    clientLogLevel: 'none',
    contentBase: './dist',
    stats: 'errors-only'
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: ['babel-loader','style-loader', 'css-loader']

  //     }
  //   ]
  // //   loaders: [
  // //     {
  // //         test: /\.css$/,
  // //         loader: 'babel-loader',
  // //         query: {
  // //             presets: ['es2015']
  // //         }
  // //     }
  // // ]

  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      
      {
        test: /\.js$/,
        //exclude: /(node_modules.(?!ol\/))/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,         
            sourceMaps: true
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }, {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015','react']
        }
    
      },
       {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'     
      }
    ]
  },
  plugins: [
    new CopyPlugin([{from: 'data', to: 'data'}]),
    new CopyPlugin([{from: 'src/assets/img', to: 'src/assets/img'}]),
    // new HtmlPlugin({
    //   template: 'index.html'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      React: 'react', 
      $: 'jquery',
      jquery: 'jquery',
      Promise: 'es6-promise'               
    }) 
  ]
};
