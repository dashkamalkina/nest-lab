import { cleanEnv, host, port, str, url } from 'envalid';
import 'dotenv/config';

const env = cleanEnv(process.env, {
  DB_NAME: str(),
  DB_HOST: host(),
  DB_PORT: port(),
  DB_USER: str(),
  DB_PASSWORD: str(),

  SUPERTOKENS_CONNECTION_URI: url(),
  SUPERTOKENS_API_KEY: str(),

  APP_DOMAIN: url(),
});

const config = {
  DB_NAME: env.DB_NAME,
  DB_HOST: env.DB_HOST,
  DB_PORT: env.DB_PORT,
  DB_USER: env.DB_USER,
  DB_PASSWORD: env.DB_PASSWORD,

  SUPERTOKENS_CONNECTION_URI: env.SUPERTOKENS_CONNECTION_URI,
  SUPERTOKENS_API_KEY: env.SUPERTOKENS_API_KEY,

  APP_DOMAIN: env.APP_DOMAIN,
};

export default config;
