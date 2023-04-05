import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: 'sql10611324',
  password: 'LzMs4FEcAT',
  database: 'sql10611324',
  host: 'sql10.freesqldatabase.com',
  port: 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;
