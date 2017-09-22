module.exports = {
    entry: './src/entry.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'eslint-loader',
                options: {
                    emitError: false
                }
            }
        ]
    }
};
