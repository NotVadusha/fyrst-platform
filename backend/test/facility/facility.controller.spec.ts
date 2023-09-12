import { Test, TestingModule } from '@nestjs/testing';
import { FacilityController } from 'src/packages/facility/facility.controller';
import { FacilityService } from 'src/packages/facility/facility.service';
import { existingId, mockedFacility, mockedFacilityService } from './facility.mock';
import { UserService } from 'src/packages/user/user.service';

describe('FacilityController', () => {
  let controller: FacilityController;
  let service: FacilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityController],
      providers: [
        { provide: FacilityService, useValue: mockedFacilityService },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<FacilityController>(FacilityController);
    service = module.get<FacilityService>(FacilityService);
  });

  it('should create a new booking', async () => {
    expect(await controller.create(mockedFacility));
    expect(service.create).toBeCalledWith(mockedFacility);
  });

  it('should find all bookings', async () => {
    expect(await controller.findAll());
    expect(service.findAll).toBeCalled();
  });

  it('should find booking by id', async () => {
    expect(await controller.findById(existingId));
    expect(service.findById).toBeCalledWith(existingId);
  });
  it('should update booking', async () => {
    expect(await controller.update(existingId, mockedFacility));
    expect(service.update).toBeCalledWith(existingId, mockedFacility);
  });
  it('should delete booking', async () => {
    expect(await controller.remove(existingId));
    expect(service.remove).toBeCalledWith(existingId);
  });
});
