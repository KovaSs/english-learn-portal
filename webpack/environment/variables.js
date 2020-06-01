const webpack = require('webpack');
const path = require('path');

const { version } = require('../../package.json');

const dotenvConfigPath = process.env.ENV_PATH || './.env';
require('dotenv').config({
  path: dotenvConfigPath && path.resolve(__dirname, `../../${dotenvConfigPath}`)
});

const parseBoolean = require('./parseBoolean');

const VARIABLES = {
  // Develop settings
  VERSION: version || '',
  DEV_HOST: process.env.DEV_HOST || '0.0.0.0',
  DEV_PORT: process.env.DEV_PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'production',
  DEV: parseBoolean(process.env.DEV, false),
  REDUX_DEV_TOOLS_ENABLED: parseBoolean(process.env.REDUX_DEV_TOOLS_ENABLED, false),
  // Analytics
  SENTRY_DSN: process.env.SENTRY_DSN || '',
  CRASH_ANALYTICS_SEND: parseBoolean(process.env.CRASH_ANALYTICS_SEND, false),
  // Key-admin styles
  ADMIN_CSS: process.env.ADMIN_CSS || '',
  // Api
  CONFIG_JSON_URL: process.env.CONFIG_JSON_URL || '',
  DSTORE_URL: process.env.DSTORE_URL || '',
  USTORE_URL: process.env.USTORE_URL || '',
  HH_URL: process.env.HH_URL || '',
  // Feature togglers
  SHOW_TREE_ICONS: parseBoolean(process.env['DMH-4198_SHOW_TREE_ICONS'], false),
};

/**
 * Функционал создания декларационного объекта с env переменными, записанными в формате __ENV__
 */
const __ENV__ = Object.entries(VARIABLES).reduce((acc, [key, value]) => {
  acc[`__${key}__`] = typeof value === 'string' ? JSON.stringify(value) : value;
  return acc;
}, {});

const plugin = new webpack.DefinePlugin(__ENV__);

module.exports = { VARIABLES, plugin };
