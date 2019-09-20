const path = require('path');
const webpack = require('webpack');

// This webpack configuration has multiple output targets.
// Based on https://stackoverflow.com/a/38132106/5868796

const js_loader = {
  test: /\.js$/,
  loader: "babel-loader",
  exclude: /(node_modules|bower_components)/,
  query: {
    babelrc: false,
    presets: [["@babel/preset-env", { modules: false }]],
  },
};

const ts_loader = {
  test: /\.tsx?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
};

const liquid_html_loader = {
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
              'generating_plugin_script': true,
          }
      }
    },
  ],
};

const jquery_plugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
});

const common_config = {
  // NOTE: Change this to 'development' to prevent minification
  mode: 'production',
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

const jekyll_config = {
  ...common_config,
  context: path.resolve(__dirname, 'src_js/theme'),
  entry: './main.ts',
  output: {
    path: path.join(__dirname, '/assets/js/'),
    filename: 'spec_main.js',
  },
  module: {
    rules: [
      js_loader,
      ts_loader,
    ]
  },
};

const custom_plugin_config = {
  ...common_config,
  context: path.resolve(__dirname, 'src_js/custom_plugin'),
  entry: './main.ts',
  output: {
    path: path.join(__dirname, '/assets/js/'),
    filename: 'primer_spec_plugin.js',
  },
  module: {
    rules: [
      js_loader,
      ts_loader,
      liquid_html_loader,
    ]
  },
};

module.exports = [
  jekyll_config,
  custom_plugin_config,
];
