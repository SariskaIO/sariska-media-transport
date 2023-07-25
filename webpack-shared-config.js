/* global __dirname */
const path = require('path');
const process = require('process');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ProvidePlugin, IgnorePlugin } = require('webpack');
const webpack = require('webpack');

module.exports = (minimize, analyzeBundle) => {
   return {
        // The inline-source-map is used to allow debugging the unit tests with Karma
        devtool: minimize ? 'source-map' : 'inline-source-map',
        resolve: {
            extensions: ['', '.js', '.ts' ],
            alias: {
                'jquery': require.resolve('jquery/dist/jquery.slim.min.js')
            }
        },
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
                test: path.join(__dirname, 'SariskMediaTransport.js')
            }, {
                // Transpile ES2015 (aka ES6) to ES5.

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
                                    chrome: 80,
                                    electron: 10,
                                    firefox: 68,
                                    safari: 14
                                }
                            }
                        ],
                        '@babel/preset-typescript'
                    ],
                     "plugins": [
                        "@babel/plugin-proposal-optional-chaining",
                        "@babel/plugin-proposal-nullish-coalescing-operator"
                      ]
                },
                test: /\.(js|ts)$/
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
            maxAssetSize: 1.2 * 1024 * 1024,
            maxEntrypointSize: 1.2 * 1024 * 1024
        },
        plugins: [
            new IgnorePlugin({ resourceRegExp: /^(@xmldom\/xmldom|ws)$/ }),
            analyzeBundle
            && new BundleAnalyzerPlugin({
                analyzerMode: 'disabled',
                generateStatsFile: true
            }),
            !minimize
                && new ProvidePlugin({
                    process: require.resolve('process/browser')
                })
        ].filter(Boolean)
    }
};
