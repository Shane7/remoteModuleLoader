module.exports = {
    entry:  __dirname + "/a2/main",

    output: {
        path: __dirname + "/a2/bld",
        filename: "a2bundle.js",
        libraryTarget: "var",
        library: 'a2shane'
    }
}