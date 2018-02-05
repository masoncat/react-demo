/**
 * Created by wm.liu on 2018/2/2.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: "inline-source-map",
    devServer: {
        contentBase: './dist',
        hot: true,
    },
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
})