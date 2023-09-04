import { Global, Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './entities/roles.entity';
import { User } from '../user/entities/user.entity';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Roles, User])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
