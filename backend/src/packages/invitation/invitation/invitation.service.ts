import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entities/invitation.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from 'src/packages/booking/entities/booking.entity';
import { User } from 'src/packages/user/entities/user.entity';
import { Facility } from 'src/packages/facility/entities/facility.entity';
import { CalendarEventsService } from 'src/packages/calendar-events/calendar-events.service';
import { BookingService } from 'src/packages/booking/booking.service';
import { UserService } from 'src/packages/user/user.service';

@Injectable()
export class InvitationService {
  constructor(
    @InjectModel(Invitation)
    private readonly invitationRespository: typeof Invitation,
    private readonly calendarEventsService: CalendarEventsService,
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
  ) {}

  async create(createInvitationDto: CreateInvitationDto, ownerId: number) {
    await Promise.all([
      this.userService.findOne(ownerId),
      this.userService.findOne(createInvitationDto.employeeId),
      this.bookingService.find(createInvitationDto.bookingId),
    ]);

    return await this.invitationRespository.create({
      ...createInvitationDto,
      organizerId: ownerId,
    });
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
          include: [
            {
              model: Facility,
              as: 'facility',
            },
          ],
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
  }

  async findOne(id: number) {
    const invitation = await this.invitationRespository.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Booking,
          as: 'booking',
          include: [
            {
              model: Facility,
              as: 'facility',
            },
            { model: User, as: 'users' },
          ],
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

    if (!invitation) {
      throw new NotFoundException(`Facility with ID ${id} not found`);
    }

    return invitation;
  }

  async update(id: number, updateInvitationDto: UpdateInvitationDto) {
    const invitation = await this.findOne(id);

    const updatedInvitation = await invitation.update({
      ...updateInvitationDto,
    });

    if (updateInvitationDto.status === 'accepted') {
      this.calendarEventsService.create({
        name: 'Inverview',
        description: `Inverview for ${invitation.booking.facility.name} position`,
        startDate: invitation.date,
        endDate: invitation.date,
        user_id: invitation.employee.id,
      });
    }

    return updatedInvitation;
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }
}
