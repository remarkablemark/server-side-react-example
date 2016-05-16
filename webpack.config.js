'use strict';

/**
 * Webpack configuration.
 */
module.exports = {
    entry: './src/js/main.js',

    output: {
        filename: 'bundle.js',
        path: './build/js/'
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
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};
