/**
 * Created by wm.liu on 2018/2/2.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(common, {
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }
            ]
        },{
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: [
                'style-loader',
                'css-loader',
            ]
        }]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
});