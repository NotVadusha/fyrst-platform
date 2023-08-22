import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, Logger } from '@nestjs/common';
import { BookingService, Booking } from 'src/packages/booking/booking';
import { getModelToken } from '@nestjs/sequelize';
import { mockedBooking, mockedBookings, mockedUpdatedBooking } from './booking.mock';

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
      const mockCreatedBooking = { id: 1, ...mockedBooking };
      bookingModel.create = jest.fn().mockResolvedValue(mockCreatedBooking);

      const result = await bookingService.create(mockedBooking);

      expect(result).toEqual(mockCreatedBooking);
      expect(logger.log).toHaveBeenCalledWith(`Created note with ID ${mockCreatedBooking.id}`, {
        createdBooking: mockCreatedBooking,
      });
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
  });

  describe('update', () => {
    it('should update a booking', async () => {
      const mockBooking = { id: 1, update: jest.fn() };
      bookingService.find = jest.fn().mockResolvedValue(mockBooking);

      const result = await bookingService.update(1, mockedUpdatedBooking);

      expect(mockBooking.update).toHaveBeenCalledWith(mockedUpdatedBooking);
      expect(result).toEqual(mockBooking);
      expect(logger.log).toHaveBeenCalledWith(`Updated booking with ID 1`, {
        booking: mockBooking,
      });
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
