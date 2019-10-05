/**
 * webpack.config.js
 * 
 * This config accepts an 'env' parameter, which can take on values 'prod' or
 * 'dev'. (Defaults to 'dev'.)
 * Specify the one you want by running `npx webpack --env <prod|dev>`.
 * Alternatively, use 'script/build` for development, and 'script/cibuild' for
 * production.
 * 
 * The config has two output targets:
 *   - theme: spec_main.js
 *   - plugin: primer_spec_plugin.js
 */

const path = require('path');
const webpack = require('webpack');

const PROD_ENV = 'prod';
const DEV_URL = 'http://localhost:4000';
const PROD_URL = 'https://eecs485staff.github.io/primer-spec'

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

function liquid_html_loader(env) {
  return {
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
                'base_url': env == PROD_ENV ? PROD_URL : DEV_URL,
            }
        }
      },
    ],
  };
}

function common_config(env) {
  return {
    mode: env == PROD_ENV ? 'production' : 'development',
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
}

function theme_config(env) {
  return {
    ...common_config(env),
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
}

function plugin_config(env) {
  return {
    ...common_config(env),
    context: path.resolve(__dirname, 'src_js/plugin'),
    entry: './main.ts',
    output: {
      path: path.join(__dirname, '/assets/js/'),
      filename: 'primer_spec_plugin.js',
    },
    module: {
      rules: [
        js_loader,
        ts_loader,
        liquid_html_loader(env),
      ]
    },
  };
}

// This webpack configuration has multiple output targets.
// Based on https://stackoverflow.com/a/38132106/5868796
module.exports = env => [
  theme_config(env),
  plugin_config(env),
];
