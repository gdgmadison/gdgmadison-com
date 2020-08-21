const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const patterns = [
  {
    from: 'src/img',
    to: 'img',
  },
  {
    from: 'src/404.html',
    to: '404.html',
  },
  {
    from: 'src/manifest.json',
    to: 'manifest.json',
  },
];

module.exports = {
  mode,
  watch: mode === 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    contentBase: './public',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      cache: false, // https://github.com/jantimon/html-webpack-plugin/issues/1476
      template: './src/index.html',
      files: {
        css: ['./index.css'],
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new CopyPlugin({ patterns }),
  ],
};
