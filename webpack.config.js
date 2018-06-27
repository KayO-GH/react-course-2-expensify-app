const path = require("path");//require the node path function

module.exports = {
    entry: "./src/app.js",
    output:{
        path:path.join(__dirname,"public"),
        filename:"bundle.js"
    },
    module:{
        rules:[{
            loader: "babel-loader",
            test: /\.js$/, //check if file ends with .js
            exclude: /node_modules/, //exclude the node_modules folder
        },{
            test: /\.s?css$/,
            use:[
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        }]
    },
    devtool:"chea-module-eval-source-map",
    devServer:{
        contentBase:path.join(__dirname,"public"),
        historyApiFallback: true
    }
};
