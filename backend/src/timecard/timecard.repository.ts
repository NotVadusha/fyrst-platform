import { Injectable } from '@nestjs/common';
import { Timecard } from './entities/timecard.entity';
import { ITimecardRepository } from './interfaces/timecard-repostiory.interaface';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TimecardRepository implements ITimecardRepository {
  constructor(@InjectModel(Timecard) private readonly timecardModel: typeof Timecard) {}

  instantiateEntity(partial: Partial<Timecard>): Timecard {
    return this.timecardModel.build(partial);
  }

  async getById(id: number): Promise<Timecard> {
    return await this.timecardModel.findOne({
      where: {
        id,
      },
      rejectOnEmpty: true,
    });
  }

  async getAll(): Promise<Timecard[]> {
    return await this.timecardModel.findAll();
  }

  async create(entity: Timecard): Promise<Timecard> {
    return await entity.save();
  }

  async update(entity: Timecard): Promise<Timecard> {
    return await entity.save();
  }

  async remove(entity: Timecard): Promise<Timecard> {
    await entity.destroy();

    return entity;
  }
}
