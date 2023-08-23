import { Test, TestingModule } from '@nestjs/testing';
import { FacilityService } from '../../src/packages/facility/facility.service';
import { Facility } from 'src/packages/facility/entities/facility.entity';

import { getModelToken } from '@nestjs/sequelize';
import {
  facilitiesMock,
  mockedFacilityService,
  mockedFacility,
  mockedUpdateFacility,
} from './facility.mock'; // Import from the facility.mock.js file

describe('FacilityService', () => {
  let service: FacilityService;
  let facilityModel: typeof Facility;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacilityService,
        {
          provide: getModelToken(Facility),
          useValue: mockedFacilityService,
        },
      ],
    }).compile();

    service = module.get<FacilityService>(FacilityService);
    facilityModel = module.get<typeof Facility>(getModelToken(Facility));
  });

  describe('create', () => {
    it('should create a facility', async () => {
      const mockCreatedFacility = { id: 1, ...mockedFacility };
      facilityModel.create = jest.fn().mockResolvedValue(mockCreatedFacility);

      const result = await service.create(mockedFacility);

      expect(result).toEqual(mockCreatedFacility);
    });
  });

  describe('findAll', () => {
    it('should retrieve all facilities', async () => {
      facilityModel.findAll = jest.fn().mockResolvedValue(facilitiesMock);

      const result = await service.findAll();

      expect(result).toEqual(facilitiesMock);
    });
  });

  describe('findById', () => {
    it('should find a facility by ID', async () => {
      const mockFacility = { id: 1, ...mockedFacility };
      facilityModel.findOne = jest.fn().mockResolvedValue(mockFacility);

      const result = await service.findById(1); // Use findById instead of find

      expect(result).toEqual(mockFacility);
    });
  });

  describe('update', () => {
    it('should update a facility', async () => {
      const mockFacility = { id: 1, update: jest.fn() };
      service.findById = jest.fn().mockResolvedValue(mockFacility);
      const result = await service.update(1, mockedUpdateFacility);

      expect(mockFacility.update).toHaveBeenCalledWith(mockedUpdateFacility);
      expect(result).toEqual(mockFacility);
    });
  });

  describe('remove', () => {
    // Change from 'delete' to 'remove'
    it('should delete a facility', async () => {
      const mockFacility = { destroy: jest.fn() };
      service.findById = jest.fn().mockResolvedValue(mockFacility);

      await service.remove(1);

      expect(mockFacility.destroy).toHaveBeenCalled();
    });
  });
});
