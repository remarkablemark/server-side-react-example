'use strict';

/**
 * Webpack configuration.
 */
module.exports = {
    entry: './src/main.js',

    output: {
        filename: 'bundle.js',
        path: './build/'
    },

    devtool: 'inline-source-map',

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.json', '.jsx']
    }
};
