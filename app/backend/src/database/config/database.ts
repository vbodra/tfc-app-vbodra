import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: 'tfc_db_0ab1_user',
  password: 'sQ2BjhGgOL7ahx2PiEaDmuhkQd8o6mQ8',
  database: 'tfc_db_0ab1',
  host: "dpg-cgmt372ut4meq5l068ug-a",
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;
