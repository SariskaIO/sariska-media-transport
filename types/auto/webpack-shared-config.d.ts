declare function _exports(minimize: any, analyzeBundle: any): {
    devtool: string;
    resolve: {
        extensions: string[];
        alias: {
            jquery: string;
        };
    };
    mode: string;
    module: {
        rules: ({
            loader: string;
            options: {
                flags: string;
                replace: string;
                search: string;
                presets?: undefined;
                plugins?: undefined;
            };
            test: string;
        } | {
            loader: string;
            options: {
                presets: (string | (string | {
                    modules: boolean;
                    targets: {
                        chrome: number;
                        electron: number;
                        firefox: number;
                        safari: number;
                    };
                })[])[];
                plugins: string[];
                flags?: undefined;
                replace?: undefined;
                search?: undefined;
            };
            test: RegExp;
        })[];
    };
    node: {
        __filename: boolean;
    };
    optimization: {
        concatenateModules: any;
    };
    output: {
        filename: string;
        path: string;
        sourceMapFilename: string;
    };
    performance: {
        hints: string | boolean;
        maxAssetSize: number;
        maxEntrypointSize: number;
    };
    plugins: any[];
};
export = _exports;
