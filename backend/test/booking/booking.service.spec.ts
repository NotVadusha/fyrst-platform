import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, Logger } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import {
  facilityServiceMock,
  mockedBooking,
  mockedBookings,
  mockedUpdatedBooking,
  userServiceMock,
} from './booking.mock';
import { UserService } from 'src/packages/user/user.service';
import { BookingService } from 'src/packages/booking/booking.service';
import { Booking } from 'src/packages/booking/entities/booking.entity';
import { FacilityService } from 'src/packages/facility/facility.service';

describe('BookingService', () => {
  let bookingService: BookingService;
  let bookingModel: typeof Booking;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getModelToken(Booking),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByPk: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        { provide: FacilityService, useValue: facilityServiceMock },
      ],
    }).compile();

    bookingService = module.get<BookingService>(BookingService);
    bookingModel = module.get<typeof Booking>(getModelToken(Booking));
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(bookingService).toBeDefined();
  });

  describe('create', () => {
    it('should create a booking', async () => {
      userServiceMock.findOne.mockResolvedValue({ id: 1, name: 'Test User' });
      const mockCreatedBooking = { id: 1, ...mockedBooking };
      bookingModel.create = jest.fn().mockResolvedValue(mockCreatedBooking);

      const result = await bookingService.create(mockedBooking);

      expect(result).toEqual(mockCreatedBooking);
      expect(logger.log).toHaveBeenCalledWith(`Created note with ID ${mockCreatedBooking.id}`, {
        createdBooking: mockCreatedBooking,
      });
    });
    it('should throw NotFoundException if user is not found', async () => {
      userServiceMock.findOne.mockResolvedValue(null);

      await expect(bookingService.create(mockedBooking)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if facility is not found', async () => {
      facilityServiceMock.findById.mockResolvedValue(null);

      await expect(bookingService.create(mockedBooking)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should retrieve all bookings', async () => {
      bookingModel.findAll = jest.fn().mockResolvedValue(mockedBookings);

      const result = await bookingService.findAll();

      expect(result).toEqual(mockedBookings);
      expect(logger.log).toHaveBeenCalledWith(`Retrieved ${mockedBookings.length} bookings`, {
        bookings: mockedBookings,
      });
    });
  });

  describe('find', () => {
    it('should find a booking by ID', async () => {
      const mockBooking = { id: 1, ...mockedBooking };
      bookingModel.findByPk = jest.fn().mockResolvedValue(mockBooking);

      const result = await bookingService.find(1);

      expect(result).toEqual(mockBooking);
      expect(logger.log).toHaveBeenCalledWith(`Finding booking with ID 1`, {
        booking: mockBooking,
      });
    });

    it('should throw NotFoundException if booking is not found', async () => {
      bookingModel.findByPk = jest.fn().mockResolvedValue(null);

      await expect(bookingService.find(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if facility is not found', async () => {
      facilityServiceMock.findById.mockResolvedValue(null);

      await expect(bookingService.create(mockedBooking)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a booking', async () => {
      userServiceMock.findOne.mockResolvedValue({ id: 1, name: 'Test User' });
      facilityServiceMock.findById.mockResolvedValue({ id: 1, name: 'Test Facility' });
      const mockBooking = { id: 1, update: jest.fn() };
      bookingService.find = jest.fn().mockResolvedValue(mockBooking);

      const result = await bookingService.update(1, mockedUpdatedBooking);

      expect(mockBooking.update).toHaveBeenCalledWith(mockedUpdatedBooking);
      expect(result).toEqual(mockBooking);
      expect(logger.log).toHaveBeenCalledWith(`Updated booking with ID 1`, {
        booking: mockBooking,
      });
    });
    it('should throw NotFoundException if user is not found', async () => {
      userServiceMock.findOne.mockResolvedValue(null);

      await expect(bookingService.update(1, mockedUpdatedBooking)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if facility is not found', async () => {
      facilityServiceMock.findById.mockResolvedValue(null);

      await expect(bookingService.create(mockedBooking)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a booking', async () => {
      const mockBooking = { destroy: jest.fn() };
      bookingService.find = jest.fn().mockResolvedValue(mockBooking);

      await bookingService.delete(1);

      expect(mockBooking.destroy).toHaveBeenCalled();
    });
  });
});
