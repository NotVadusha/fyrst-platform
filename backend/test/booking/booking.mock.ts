const mockedBookings = [
  {
    status: 'accepted',
    numberOfPositions: 3,
    facilitiesRate: 4,
    createdBy: 1,
    sex: 'woman',
    age: 18,
    education: 'National Aviation University',
    positionsAvailable: 2,
    workingHours: 8,
    pricePerHour: 10,
    notes: 'Cool girl',
    facilityId: 10,
  },
  {
    status: 'pending',
    numberOfPositions: 5,
    facilitiesRate: 4.5,
    createdBy: 2,
    sex: 'man',
    age: 22,
    education: 'National Aviation University',
    positionsAvailable: 3,
    workingHours: 5,
    pricePerHour: 20,
    notes: 'Cool boy',
    facilityId: 5,
  },
];

const mockedBooking = mockedBookings[0];
const mockedUpdatedBooking = { status: 'accepted', ...mockedBookings[0] };

const existingId = 1;
const nonExistingId = -1;

const mockedBookingService = {
  findAll: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export {
  mockedBookings,
  mockedBooking,
  mockedUpdatedBooking,
  existingId,
  nonExistingId,
  mockedBookingService,
};
