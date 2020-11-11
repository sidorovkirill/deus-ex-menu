'use strict';

const path = require('path');
const root = path.join(__dirname, '.');

module.exports = (env) => {
    const config = {
        entry: {
            main: './src/main'
        },

        output: {
            filename: 'bundle.js',
            path: `${root}/dist`
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
                {
                    test: /\.glsl$/i,
                    use: 'raw-loader',
                }
            ]
        },

        plugins: [],

        devServer: {
            overlay: true,
        }
    };

    // Builds
    const build = env && env.production ? 'prod': 'dev';
    Object.assign(config, require(`./webpack.config.${build}`));

    console.log(`Build mode: \x1b[33m${config.mode}\x1b[0m`);

    return config;
};
