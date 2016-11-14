const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const webpack = require('webpack');

const parts = require('./libs/parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  node: path.join(__dirname, 'node_modules')

};


// common configuration 
const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Exxobrain Editor' ,
      template:  'app/index.ejs'
    }),
    new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
    })
  ],
  module: {
    loaders: [
    { test: /bootstrap\/js\//, 
      loader: 'imports?jQuery=jquery' },
 	{
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less']
    }, {
      test: /\.woff$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
    }, {
      test: /\.woff2$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
    }, {
      test: /\.(eot|ttf|svg|gif|png)$/,
      loader: "file-loader"
    }
   ]
  }
};


switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
             common, 
             {
               devtool: 'source-map'
             },
             parts.setupCSS([PATHS.app,PATHS.node]) 
            );
    break;
  default:
    config = merge(common, 
             {
               devtool: 'eval-source-map',
               plugins: [
                 new NpmInstallPlugin({
                    save: true // --save
                 })
               ]
             },
             parts.setupCSS([PATHS.app,PATHS.node]),
             parts.devServer({
                host: process.env.HOST,
                port: process.env.PORT
             })
            );
}


module.exports=validate(config)
