var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        pubicPath: '/static/'
    },
    module: {
        loaders: [
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'eslint!babel'
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint!babel'
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
