import { Test, TestingModule } from '@nestjs/testing';
import { existingId, mockedBooking, mockedBookingService } from './booking.mock';
import { BookingController } from 'src/packages/booking/booking.controller';
import { BookingService } from 'src/packages/booking/booking.service';

describe('BookingController', () => {
  let controller: BookingController;
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: mockedBookingService,
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    service = module.get<BookingService>(BookingService);
  });

  it('should create a new booking', async () => {
    expect(await controller.createBooking(mockedBooking));
    expect(service.create).toBeCalledWith(mockedBooking);
  });

  it('should find all bookings', async () => {
    expect(await controller.getAllBookings());
    expect(service.findAll).toBeCalled();
  });

  it('should find booking by id', async () => {
    expect(await controller.getOneBooking(existingId));
    expect(service.find).toBeCalledWith(existingId);
  });
  it('should update booking', async () => {
    expect(await controller.updateBooking(existingId, mockedBooking));
    expect(service.update).toBeCalledWith(existingId, mockedBooking);
  });
  it('should delete booking', async () => {
    expect(await controller.deleteBooking(existingId));
    expect(service.delete).toBeCalledWith(existingId);
  });
});
