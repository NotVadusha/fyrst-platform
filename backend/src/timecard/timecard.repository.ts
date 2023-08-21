import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateTimecardDto } from './dto';
import { Timecard } from './entities';
import { ITimecardRepository } from './interfaces';

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

  async getAllFiltered(
    filters: UpdateTimecardDto,
    limit?: number,
    offset?: number,
  ): Promise<Timecard[]> {
    return await this.timecardModel.findAll({
      where: { ...filters },
      limit: limit,
      offset: offset,
    });
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
