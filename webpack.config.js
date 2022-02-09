const path = require('path');
const process = require('process');
const sharedConfig = require('./webpack-shared-config');

module.exports = (_env, argv) => {
    // Despite what whe docs say calling webpack with no arguments results in mode not being set.
    const mode = typeof argv.mode === 'undefined' ? 'production' : argv.mode;
    const config
        = sharedConfig(mode === 'production' /* minimize */, Boolean(process.env.ANALYZE_BUNDLE) /* analyzeBundle */);

    return [
        Object.assign({}, config, {
            entry: {
                'sariska-media-transport': './index.js'
            },
            output: Object.assign({}, config.output, {
                library: 'SariskaMediaTransport',
                libraryTarget: 'umd',
                path: path.join(process.cwd(), 'dist', 'umd')
            })
        }),
        Object.assign({}, config, {
            entry: {
                'flacEncodeWorker': './modules/local-recording/recording/flac/flacEncodeWorker.js'
            },
            plugins: [
                ...config.plugins,
            ]
        }),
        {
            entry: {
                worker: './modules/e2ee/Worker.js'
            },
            mode,
            output: {
                filename: 'sariska-media-transport.e2ee-worker.js',
                path: path.resolve(__dirname, 'dist')
            },
            optimization: {
                minimize: false
            }
        }
    ];
};

