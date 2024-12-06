const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Для копирования статических файлов

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Указывает корневой путь для статических файлов
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        // Для SCSS-модулей
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path]__[local]--[hash:base64:5]', // Генерирует имя класса с путем, именем файла и хешем
              },
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        // Для обычных SCSS файлов (не модульных)
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // Для обработки изображений и иконок
        test: /\.(ico|png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]', // Копирует файлы в папку dist/img
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/img', to: 'img' }, // Копируем файлы из public/img в dist/img
      ],
    }),
  ],
  devServer: {
    static: './dist',
    hot: true,
    watchFiles: ['src/**/*.scss', 'src/**/*.css'],
    port: 3000,
    historyApiFallback: true,
  },
};
