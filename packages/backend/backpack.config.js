/* eslint-disable @typescript-eslint/no-var-requires */

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack: (config) => {
    config.entry.main = [
      './src/index.ts',
    ]

    config.resolve = {
      extensions: ['.ts', '.js', '.mjs', '.json'],
    }

    config.optimization.minimize = false

    config.module.rules.push(
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    )

    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ]

    return config
  },
}
