'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const profiles = [];

    const platformAdmin = {
      user_id: 20,
      languages: ['English B2'],
      description:
        'Dedicated Fyrst Admin with a passion for optimizing workforce solutions. Skilled in managing talent pools, enhancing recruitment processes, and fostering meaningful client relationships. Committed to delivering top-notch staffing services that drive success for both employers and job seekers.',
      education: 'Bachelor of Business Administration',
      sex: 'male',
    };

    const facilityManager = {
      user_id: 21,
      languages: ['English B2'],
      description:
        'Experienced Facility Manager specializing in optimizing staffing platform operations. Adept at creating efficient workplace environments, ensuring seamless daily operations, and enhancing user experience. Committed to maintaining top-tier facilities that support the success of our clients and workforce.',
      education: 'Bachelor of Science in Human Resources Management',
      sex: 'female',
    };

    const worker = {
      user_id: 22,
      languages: ['English B2'],
      description:
        "I'm a Compassionate Healthcare Worker. With a background in nursing and a deep commitment to improving lives, I specialize in delivering exceptional patient care. My experience includes providing quality medical assistance, offering crucial emotional support, and ensuring the overall well-being of my patients. I'm driven by my dedication to making a positive impact on the healthcare field, one patient at a time.",
      education: 'Bachelor of Science in Nursing',
      sex: 'female',
    };

    const paymentWorker = {
      user_id: 24,
      languages: ['English B2'],
      description:
        "im worker",
      education: 'Bachelor of Science in Nursing',
      sex: 'female',
    };

    const paymentManager = {
      user_id: 23,
      languages: ['English B2'],
      description:
        "im manager",
      education: 'Bachelor of Science in Nursing',
      sex: 'female',
    };

    profiles.push(platformAdmin, facilityManager, worker, paymentWorker, paymentManager);

    await queryInterface.bulkInsert('User-profile', profiles);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User-profiles', null, {});
  },
};
