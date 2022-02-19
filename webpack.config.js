const process = require('process');
const path = require('path');

const config = require('./webpack-shared-config');

module.exports = [
    Object.assign({}, config, {
        entry: {
            'sariska-media-transport': './src/index.js'
        },
        output: Object.assign({}, config.output, {
            library: 'SariskaMediaTransport',
            libraryTarget: 'umd'
        })
    }),
    Object.assign({}, config, {
        entry: {
            'flacEncodeWorker': './src/modules/local-recording/recording/flac/flacEncodeWorker.js'
        },
        plugins: [
            ...config.plugins,
        ]
    }),
    {
        entry: {
            worker: './src/modules/e2ee/Worker.js'
        },
        mode: 'production',
        output: {
            filename: 'sariska-media-transport.e2ee-worker.js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            minimize: false
        }
    }
];


