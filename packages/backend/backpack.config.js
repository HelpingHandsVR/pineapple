/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const entities = fs.readdirSync('./src/entity')
const seeds = fs.readdirSync('./src/db/seed')
const factories = fs.readdirSync('./src/db/factory')
const migrations = fs.readdirSync('./src/migration')

const entry = {
  main: [
    './src/index.ts',
  ],
}

entities
  .map(path.parse)
  .forEach(({ name }) => {
    entry[`entity/${name}`] = `./src/entity/${name}`
  })

seeds
  .map(path.parse)
  .forEach(({ name }) => {
    entry[`seed/${name}`] = `./src/db/seed/${name}`
  })

factories
  .map(path.parse)
  .forEach(({ name }) => {
    entry[`factory/${name}`] = `./src/db/factory/${name}`
  })

migrations
  .map(path.parse)
  .forEach(({ name }) => {
    entry[`migration/${name}`] = `./src/migration/${name}`
  })

module.exports = {
  webpack: (config) => {
    config.entry = entry

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
