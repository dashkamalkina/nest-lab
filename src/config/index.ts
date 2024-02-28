import { cleanEnv, host, port, str } from 'envalid';
import 'dotenv/config';

const env = cleanEnv(process.env, {
  DB_NAME: str(),
  DB_HOST: host(),
  DB_PORT: port(),
  DB_USER: str(),
  DB_PASSWORD: str(),
});

const config = {
  DB_NAME: env.DB_NAME,
  DB_HOST: env.DB_HOST,
  DB_PORT: env.DB_PORT,
  DB_USER: env.DB_USER,
  DB_PASSWORD: env.DB_PASSWORD,
};

export default config;
