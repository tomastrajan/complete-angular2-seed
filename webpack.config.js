const webpack = require("webpack");
const path = require("path");

module.exports = function(env) {

    return {
        debug: false,
        devtool: "source-map",
        context: path.join(__dirname, "./src"),
        entry: {
            main: "./main.ts"
        },
        output: {
            path: path.join(__dirname, "./build"),
            filename: "bundle.js"
        },
        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loader: "ts",
                    exclude: /node_modules|typings/,
                    query: {
                        compilerOptions: {
                            "target": "es6",
                            "module": "es2015"
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ["", ".ts"],
            modules: [
                path.resolve("./src"),
                "node_modules"
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: false,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin()
        ]
    }
};