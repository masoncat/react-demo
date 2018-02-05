/**
 * Created by wm.liu on 2018/2/2.
 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports= {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,'dist')
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
};