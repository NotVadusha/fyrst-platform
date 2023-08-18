import { SequelizeModuleOptions } from '@nestjs/sequelize';

import { User } from 'src/user/entities';

export const sequelizeDevelopmentConfig: SequelizeModuleOptions = {
  username: 'test',
  password: 'root',
  database: 'test',
  port: 5432,
  host: 'localhost',
  dialect: 'postgres',
  autoLoadModels: true,
  models: [User],
};
