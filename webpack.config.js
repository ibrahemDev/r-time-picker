


const path = require('path');

module.exports = {
    entry:path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },

    //development|production
    mode: 'production',
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'ts-loader',
                  }
                ],
                
              },
        ]
    }
}