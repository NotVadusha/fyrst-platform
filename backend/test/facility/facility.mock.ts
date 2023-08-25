const facilitiesMock = [
  {
    id: 1,
    logo: 'logo1.png',
    name: 'Facility A',
    city: 'City A',
    address: '123 Main St',
    description: 'Description A',
  },
  {
    id: 2,
    logo: 'logo2.png',
    name: 'Facility B',
    city: 'City B',
    address: '456 Elm St',
    description: 'Description B',
  },
];

const mockedFacility = facilitiesMock[0];
const mockedUpdateFacility = { name: 'Hello World', ...facilitiesMock[0] };

const existingId = 1;
const notExistingId = -1;

const mockedFacilityService = {
  create: jest.fn(async facility => {
    return { ...facility, id: 3 };
  }),

  findAll: jest.fn(async () => {
    return facilitiesMock;
  }),

  findById: jest.fn(async id => {
    const foundFacility = facilitiesMock.find(facility => facility.id === id);
    if (foundFacility) {
      return {
        ...foundFacility,
        save: async function () {
          return this;
        },
      };
    }
    return null;
  }),

  update: jest.fn(async (id, updatedFacility) => {
    return { ...updatedFacility, id };
  }),

  remove: jest.fn(async id => {
    const facilityToRemove = facilitiesMock.find(facility => facility.id === id);
    if (facilityToRemove) {
      return facilityToRemove;
    } else {
      throw new Error(`Facility with id ${id} not found`);
    }
  }),
};

export {
  facilitiesMock,
  mockedFacility,
  mockedUpdateFacility,
  existingId,
  notExistingId,
  mockedFacilityService,
};
