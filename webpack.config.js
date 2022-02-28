var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PORT = process.env.PORT
const TerserPlugin = require("terser-webpack-plugin");
var getPlugins = function() {
    var plugins = [];
    var noErrorsPlugin = new webpack.NoEmitOnErrorsPlugin()
  var min = new MiniCssExtractPlugin({
      filename: "[name].css",
    })
var copy = new CopyWebpackPlugin({
     patterns:[
            {from:'html'} 
        ]
})
    plugins.push(noErrorsPlugin);
   plugins.push(min)
     plugins.push(copy) 
    return plugins;
};

var webpackConfig = {
    entry: {
        settings: [
            __dirname + '/src/settings/settings'
        ],
        widget: __dirname + '/src/widget/widget'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
    },
    plugins: getPlugins(),
    externals: {
        react: 'React',
        'react/addons': 'React',
        'react-dom': 'ReactDOM',
        lodash: '_',
        jquery: '$',
        Wix: 'Wix',
        'editor-ui-lib': 'UI'
    },
    devtool: 'eval',
    module: {
        rules: [
            {test: /\.js?$/, use: 'babel-loader', include: path.join(__dirname, 'src')},
            {test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader'},
            {test: /\.css$/, use: "style-loader!css-loader"},
            {test: /\.scss$/, use: [
          MiniCssExtractPlugin.loader,	 
          "css-loader",
          "sass-loader",
        ]},
    {test: /\.html?$/,
     use: 'file-loader?name=[name].[ext]'}
]
},
devServer: {
port: process.env.PORT || 8080,
host: '0.0.0.0',
compress: true,
allowedHosts: "all",

 
}
};
module.exports =  webpackConfig;
