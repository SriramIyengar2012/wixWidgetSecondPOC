var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
contentBase: __dirname + "/public/",    
hot: true,
 port: 5001,
    historyApiFallback: true,
    https: false //Change this to true when testing on a server
}).start(5001, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:5000/');
});
