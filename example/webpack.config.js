const HtmlWebpackPlugin = require('html-webpack-plugin');


const path = require('path');

module.exports = {
    entry:path.resolve(__dirname, 'src', 'app.tsx'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },

    //development|production
    mode: 'development',
    devServer: {
      host: '0.0.0.0',
      contentBase: path.resolve(__dirname, 'dist'),
      port: 8888
    },
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
              {
                test: /\.html/,
                use: ['html-loader']
              }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      })
    ]
}