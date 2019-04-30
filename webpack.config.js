const path = require('path')

module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'client'),
                use: "babel-loader"
            }
        ]
    }
}
