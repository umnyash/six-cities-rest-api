import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
}

export const restSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections.',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB).',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB).',
    format: 'port',
    env: 'DB_PORT',
    default: 27017,
  },
  DB_NAME: {
    doc: 'Database name (MongoDB).',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities',
  },
  DB_USERNAME: {
    doc: 'Username to connect to the database.',
    format: String,
    env: 'DB_USERNAME',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database.',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
});
