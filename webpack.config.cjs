/**
 * webpack.config.cjs
 *
 * To build in 'production' mode, run `npx webpack --env production`.
 * Alternatively, use 'script/build` for development, and 'script/cibuild' for
 * production.
 *
 * The config's output target is assets/js/primer_spec_plugin.min.js.
 */

const fs = require('node:fs');
const path = require('node:path');
const semver = require('semver');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const VERSION_RAW = fs.readFileSync(
  path.resolve(__dirname, 'VERSION'),
  'utf-8',
);

// Starting with v1.2, every minor version's assets will be hosted in a
// separate directory (so that specs that use older versions of Primer Spec
// will still render correctly).
const semver_version = semver.coerce(VERSION_RAW);
if (semver_version == null) {
  throw new Error('Unexpectedly null semver version');
}
const VERSION_MINOR_STR = `v${semver_version.major}.${semver_version.minor}`;

/** @param {Record<string, unknown>} env */
function getBuildMode(env) {
  return env && env.production ? 'production' : 'development';
}

/**
 * @param {Record<string, unknown>} env
 * @returns {import('webpack').Configuration}
 */
module.exports = function (env) {
  return {
    mode: getBuildMode(env),
    context: path.resolve(__dirname, 'src_js/'),
    entry: './main.tsx',
    output: {
      path: path.join(__dirname, `/assets/${VERSION_MINOR_STR}/js/`),
      filename: 'primer_spec_plugin.min.js',
    },
    module: {
      rules: [
        // TypeScript loader
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
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
        'process.env.VERSION_RAW': JSON.stringify(VERSION_RAW),
        'process.env.VERSION_MINOR_STR': JSON.stringify(VERSION_MINOR_STR),
        'process.env.BUILD_MODE': JSON.stringify(getBuildMode(env)),
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: '../../../report.html',
      }),
    ],
    optimization: {
      usedExports: true,
    },
    // Generate sourcemaps
    devtool: 'source-map',
    // Minimize output
    stats: { preset: 'minimal' },
  };
};
