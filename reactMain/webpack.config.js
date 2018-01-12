// to load react jsx: npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react

module.exports = {
    entry:  __dirname + "/src/SimpleComponent",

    output: {
        path: __dirname + "/bld",
        filename: "bundle.js",
        libraryTarget: "var",
        library: 'shane'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                    
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}