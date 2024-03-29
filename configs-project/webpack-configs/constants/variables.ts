const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  ANALYZER: 'analyzer',
  PRODUCTION: 'production',
} as const;

const CURRENT_ENVIRONMENT = process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT;

const scriptExtensions = ['.tsx', '.ts', '.js'];

const FLAGS = {
  IS_DEVELOPMENT: CURRENT_ENVIRONMENT === ENVIRONMENTS.DEVELOPMENT,
  IS_ANALYZER: CURRENT_ENVIRONMENT === ENVIRONMENTS.ANALYZER,
  IS_PRODUCTION: CURRENT_ENVIRONMENT === ENVIRONMENTS.PRODUCTION,
};

const MODE = FLAGS.IS_PRODUCTION ? ENVIRONMENTS.PRODUCTION : ENVIRONMENTS.DEVELOPMENT;

const API_ENDPOINT = FLAGS.IS_DEVELOPMENT ? 'http://localhost:8000/' : 'https://long-ruby-snapper-tux.cyclic.app';

export {
  FLAGS,
  MODE,
  scriptExtensions,
  API_ENDPOINT,
};
