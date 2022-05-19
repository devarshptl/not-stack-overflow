"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("levels", [
      {
        level_title: "Basics",
        req_count: 0,
      },
      {
        level_title: "Advanced",
        req_count: 10,
      },
      {
        level_title: "Expert",
        req_count: 15,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("levels", null, {});
  },
};
