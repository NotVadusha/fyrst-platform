import { SequelizeModuleOptions } from '@nestjs/sequelize';

import { User } from 'src/user';

export const sequelizeDevelopmentConfig: SequelizeModuleOptions = {
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  port: 5432,
  host: 'localhost',
  dialect: 'postgres',
  autoLoadModels: true,
  models: [User],
};
