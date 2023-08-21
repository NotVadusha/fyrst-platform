import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Roles } from 'src/packages/roles/entities/roles.entity';
import { User } from 'src/packages/user/entities/user.entity';

export const sequelizeDevelopmentConfig: SequelizeModuleOptions = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
  host: 'db',
  dialect: 'postgres',
  autoLoadModels: true,
  models: [User, Roles],
};
