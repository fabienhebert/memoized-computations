var webpack = require("webpack")
var path = require("path")
var libraryName = "library"

var env  = require('yargs').argv.env;

module.exports = {
    entry : __dirname + "/src/index.js",
    devtool : "source-map",
    output : {
        path: __dirname + "/lib",
        filename : libraryName + (env === "build" ? ".min.js" : ".js"),
        library : libraryName,
        libraryTarget: "umd"
    },
    resolve: {
        path : path.resolve("./src"),
        extensions : ["", ".js"]
    },
    module : {
        loaders : [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: "node_modules"
            }
        ]
    },
    plugins : env === "build" ? [
        new webpack.optimize.UglifyJsPlugin({ minimize : true })
    ] : []
}
