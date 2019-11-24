/**
 * webpack.config.js
 * 
 * This config accepts an 'env' parameter, which can take on values 'prod' or
 * 'dev'. (Defaults to 'dev'.)
 * Specify the one you want by running `npx webpack --env <prod|dev>`.
 * Alternatively, use 'script/build` for development, and 'script/cibuild' for
 * production.
 * 
 * The config's output target is assets/js/primer_spec_plugin.min.js.
 */

const path = require('path');
const webpack = require('webpack');

// Add new subtheme names to this list.
const AVAILABLE_SUBTHEMES = [
  'default',
  'bella',
  'modern',
  'xcode-dark',
  'slack-dark',
].join(',');

const PROD_ENV = 'prod';
const DEV_URL = 'http://localhost:4000';
const PROD_URL = 'https://eecs485staff.github.io/primer-spec'

module.exports = env => ({
  mode: env === PROD_ENV ? 'production' : 'development',
  context: path.resolve(__dirname, 'src_js/'),
  entry: './main.ts',
  output: {
    path: path.join(__dirname, '/assets/js/'),
    filename: 'primer_spec_plugin.min.js',
  },
  module: {
    rules: [
      // JavaScript loader
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
        query: {
          babelrc: false,
          presets: [["@babel/preset-env", { modules: false }]],
        },
      },
      // TypeScript loader
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Liquid+HTML loader
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "liquid-loader",
            options: {
                data: {
                    // These variables are passed to the liquid templates.
                    'base_url': env === PROD_ENV ? PROD_URL : DEV_URL,
                }
            }
          },
        ],
      },
    ]
  },
  // When importing files, no need to mention these file-extensions
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    // JQuery becomes available in every file
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // These variables become available in any file
    new webpack.DefinePlugin({
      'process.env.AVAILABLE_SUBTHEMES': `'${AVAILABLE_SUBTHEMES}'`,
      'process.env.BASE_URL': `'${env === PROD_ENV ? PROD_URL : DEV_URL}'`,
    }),
  ],
  // Minimize output
  stats: 'minimal',
  devServer: {
    stats: {
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
    },
  },
});
