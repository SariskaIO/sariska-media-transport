/* global __dirname */

const path = require('path');
const process = require('process');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const analyzeBundle = process.argv.indexOf('--analyze-bundle') !== -1;

const minimize
    = process.argv.indexOf('-p') !== -1
    || process.argv.indexOf('--optimize-minimize') !== -1;

module.exports = {

    // The inline-source-map is used to allow debugging the unit tests with Karma
    devtool: minimize ? 'source-map' : 'inline-source-map',
    mode: minimize ? 'production' : 'development',
    module: {
        rules: [ {
            // Version this build of the sariska-media-transport library.

            loader: 'string-replace-loader',
            options: {
                flags: 'g',
                replace:
                    process.env.LIB_JITSI_MEET_COMMIT_HASH || 'development',
                search: '{#COMMIT_HASH#}'
            },
            test: `${__dirname}/SariskMediaTransport.js`
        }, {
            // Transpile ES2015 (aka ES6) to ES5.

            exclude: [
                new RegExp(`${__dirname}/node_modules/(?!@jitsi/js-utils)`)
            ],
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env',

                        // Tell babel to avoid compiling imports into CommonJS
                        // so that webpack may do tree shaking.
                        {
                            modules: false,

                            // Specify our target browsers so no transpiling is
                            // done unnecessarily. For browsers not specified
                            // here, the ES2015+ profile will be used.
                            targets: {
                                chrome: 58,
                                electron: 2,
                                firefox: 54,
                                safari: 11
                            }
                        }
                    ],
                    '@babel/preset-flow'
                ],
                plugins: [
                    '@babel/plugin-transform-flow-strip-types',
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-proposal-optional-chaining',
                    '@babel/plugin-proposal-export-namespace-from',
                    '@babel/plugin-proposal-nullish-coalescing-operator'
                ]
            },
            test: /\.js$/
        } ]
    },
    node: {
        // Allow the use of the real filename of the module being executed. By
        // default Webpack does not leak path-related information and provides a
        // value that is a mock (/index.js).
        __filename: true
    },
    optimization: {
        concatenateModules: minimize
    },
    output: {
        filename: `[name]${minimize ? '.min' : ''}.js`,
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: `[name].${minimize ? 'min' : 'js'}.map`
    },
    performance: {
        hints: minimize ? 'error' : false,
        maxAssetSize: 900 * 1024,
        maxEntrypointSize: 900 * 1024
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: path.resolve(__dirname, './src/dom/jquery.js')
        }),
        analyzeBundle
        && new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true
        })
    ].filter(Boolean)
};
