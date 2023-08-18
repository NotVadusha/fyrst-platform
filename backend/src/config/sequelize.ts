import { SequelizeModuleOptions } from '@nestjs/sequelize';

import { User } from 'src/user/entities';

export const sequelizeDevelopmentConfig: SequelizeModuleOptions = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
  host: 'localhost',
  dialect: 'postgres',
  autoLoadModels: true,
  models: [User],
};
