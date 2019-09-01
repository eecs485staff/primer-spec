const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'src_js'),
  entry: './main.ts',
  output: {
    path: path.join(__dirname, '/assets/js/'),
    filename: 'spec_main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
        query: {
          babelrc: false,
          presets: [["@babel/preset-env", { modules: false }]],
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
};
