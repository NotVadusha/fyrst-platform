import { Injectable, Logger } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entities/invitation.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from 'src/packages/booking/entities/booking.entity';
import { User } from 'src/packages/user/entities/user.entity';

@Injectable()
export class InvitationService {
  constructor(
    @InjectModel(Invitation)
    private readonly invitationRespository: typeof Invitation,
  ) {}

  async create(createInvitationDto: CreateInvitationDto, ownerId: number) {
    Logger.log('creating invitation');
    return await this.invitationRespository.create({
      ...createInvitationDto,
      organizerId: ownerId,
    });
    return 'This action adds a new invitation';
  }

  async findAll(userId: number) {
    return await this.invitationRespository.findAll({
      where: {
        employeeId: userId,
      },
      include: [
        {
          model: Booking,
          as: 'booking',
        },
        {
          model: User,
          as: 'organizer',
        },
        {
          model: User,
          as: 'employee',
        },
      ],
    });
    return `This action returns all invitation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`;
  }

  update(id: number, updateInvitationDto: UpdateInvitationDto) {
    return `This action updates a #${id} invitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }
}
