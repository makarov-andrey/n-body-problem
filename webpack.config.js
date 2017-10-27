const path = require('path');

module.exports = {
    entry: './src/bootstrap.js',
    output: {
        path: path.resolve(__dirname, 'docs/dist'),
        filename: 'bundle.js',
        publicPath: 'docs/dist/'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    devtool: 'source-map'
};