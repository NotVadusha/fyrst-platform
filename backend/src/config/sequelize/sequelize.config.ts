import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Booking } from 'src/packages/booking/entities/booking.entity';
import { Chat } from 'src/packages/chat/entities/chat.entity';
import { Facility } from 'src/packages/facility/entities/facility.entity';
import { Message } from 'src/packages/message/entities/message.entity';
import { Roles } from 'src/packages/roles/entities/roles.entity';
import { User, UserChat } from 'src/packages/user/entities/user.entity';
import { Permissions } from 'src/packages/permissions/entities/permissions.entity';
import { Notification } from 'src/packages/notification/entities/notification.entity';
import { NotificationsConfig } from 'src/packages/notifications-config/entities/notifications-config.entity';
import { UserProfile } from 'src/packages/user-profile/entities/user-profile.entity';
import { Event } from 'src/packages/calendar-events/entities/event.entity';

export const development: SequelizeModuleOptions = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
  host: 'db',
  dialect: 'postgres',
  autoLoadModels: true,
  models: [
    User,
    Roles,
    Facility,
    Booking,
    UserChat,
    Chat,
    Message,
    Permissions,
    UserProfile,
    Notification,
    NotificationsConfig,
    Event,
  ],
};
