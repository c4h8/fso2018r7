const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const asd =     new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "index.html"
})

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "index-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
     resolve: {
        extensions: ['*', '.js', '.jsx']
      },
  plugins: [
asd
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000
  },
};

// const config = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     publicPath: '/',
//     filename: 'index.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         use: ['babel-loader'],
//         exclude: [/node_modules/, /\.test.js$/, /\.spec.js$/],
//       },
//     ]
//   },
//   resolve: {
//     extensions: ['*', '.js', '.jsx']
//   },
//   devServer: {
//     contentBase: path.resolve(__dirname, 'build'),
//     compress: true,
//     port: 3000
//   },
//   plugins: [htmlPlugin]
// };

// module.exports = config;
