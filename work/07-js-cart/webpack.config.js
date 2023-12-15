const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/cart.js',
    devtool: 'source-map',
    output: {
        filename: 'cart.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};