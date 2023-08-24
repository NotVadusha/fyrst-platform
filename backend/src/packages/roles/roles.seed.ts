import { Roles } from './entities/roles.entity';
async function mocKRolesToDb() {
  await Roles.destroy({});
  await Roles.create({ label: 'WORKER' });
  await Roles.create({ label: 'FACILITY_ADMIN' });
  await Roles.create({ label: 'AGENCY_ADMIN' });
  await Roles.create({ label: 'SUPER_ADMIN' });
}

export { mocKRolesToDb };
