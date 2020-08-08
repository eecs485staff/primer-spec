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

const fs = require('fs');
const path = require('path');
const semver = require('semver');
const webpack = require('webpack');

const PROD_ENV = 'prod';
const DEV_URL = 'http://localhost:4000';
const PROD_URL = 'https://eecs485staff.github.io/primer-spec';
const VERSION_RAW = fs.readFileSync(
  path.resolve(__dirname, 'VERSION'),
  'utf-8',
);

// Starting with v1.2, every minor version's assets will be hosted in a
// separate directory (so that specs that use older versions of Primer Spec
// will still render correctly).
const semver_version = semver.coerce(VERSION_RAW);
const VERSION_STR = `v${semver_version.major}.${semver_version.minor}`;

function getBaseURL(env) {
  let base_url;
  if (env && env.production) {
    base_url = PROD_URL;
  } else if (env && env.base_url && typeof env.base_url === 'string') {
    base_url = env.base_url;
    if (base_url.endsWith('/')) {
      base_url = base_url.slice(0, -1);
    }
  } else {
    base_url = DEV_URL;
  }
  console.log(`Using base URL: ${base_url}`);
  return base_url;
}

module.exports = (env) => ({
  mode: env && env.production ? 'production' : 'development',
  context: path.resolve(__dirname, 'src_js/'),
  entry: './main.tsx',
  output: {
    path: path.join(__dirname, `/assets/${VERSION_STR}/js/`),
    filename: 'primer_spec_plugin.min.js',
  },
  module: {
    rules: [
      // JavaScript loader
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          babelrc: false,
          presets: [['@babel/preset-env', { modules: false }]],
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
            loader: 'html-loader',
          },
          {
            loader: 'liquid-loader',
            options: {
              data: {
                // These variables are passed to the liquid templates.
                base_url: getBaseURL(env),
                primer_spec_version_raw: VERSION_RAW,
                primer_spec_version_string: VERSION_STR,
              },
            },
          },
        ],
      },
    ],
  },
  // When importing files, no need to mention these file-extensions
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    // These variables become available in any file
    new webpack.DefinePlugin({
      'process.env.BASE_URL': `'${getBaseURL(env)}'`,
      'process.env.VERSION_RAW': `'${VERSION_RAW}'`,
      'process.env.VERSION_STR': `'${VERSION_STR}'`,
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
