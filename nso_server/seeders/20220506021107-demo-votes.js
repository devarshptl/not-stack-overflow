"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("votes", [
      {
        answer_id: 1,
        uid: 1,
      },
      {
        answer_id: 1,
        uid: 2,
      },
      {
        answer_id: 1,
        uid: 3,
      },
      {
        answer_id: 1,
        uid: 4,
      },
      {
        answer_id: 2,
        uid: 2,
      },
      {
        answer_id: 2,
        uid: 3,
      },
      {
        answer_id: 2,
        uid: 4,
      },
      {
        answer_id: 3,
        uid: 1,
      },
      {
        answer_id: 3,
        uid: 4,
      },
      {
        answer_id: 3,
        uid: 2,
      },
      {
        answer_id: 3,
        uid: 5,
      },
      {
        answer_id: 4,
        uid: 1,
      },
      {
        answer_id: 4,
        uid: 2,
      },
      {
        answer_id: 4,
        uid: 3,
      },
      {
        answer_id: 5,
        uid: 4,
      },
      {
        answer_id: 5,
        uid: 5,
      },
      {
        answer_id: 5,
        uid: 1,
      },
      {
        answer_id: 6,
        uid: 1,
      },
      {
        answer_id: 6,
        uid: 4,
      },
      {
        answer_id: 6,
        uid: 3,
      },
      {
        answer_id: 7,
        uid: 5,
      },
      {
        answer_id: 7,
        uid: 2,
      },
      {
        answer_id: 7,
        uid: 3,
      },
      {
        answer_id: 7,
        uid: 4,
      },
      {
        answer_id: 8,
        uid: 1,
      },
      {
        answer_id: 9,
        uid: 2,
      },
      {
        answer_id: 9,
        uid: 3,
      },
      {
        answer_id: 10,
        uid: 1,
      },
      {
        answer_id: 10,
        uid: 3,
      },
      {
        answer_id: 10,
        uid: 2,
      },
      {
        answer_id: 11,
        uid: 2,
      },
      {
        answer_id: 11,
        uid: 5,
      },
      {
        answer_id: 12,
        uid: 6,
      },
      {
        answer_id: 13,
        uid: 6,
      },
      {
        answer_id: 14,
        uid: 6,
      },
      {
        answer_id: 14,
        uid: 5,
      },
      {
        answer_id: 14,
        uid: 1,
      },
      {
        answer_id: 15,
        uid: 3,
      },
      {
        answer_id: 15,
        uid: 4,
      },
      {
        answer_id: 16,
        uid: 2,
      },
      {
        answer_id: 18,
        uid: 3,
      },
      {
        answer_id: 18,
        uid: 2,
      },
      {
        answer_id: 19,
        uid: 1,
      },
      {
        answer_id: 19,
        uid: 2,
      },
      {
        answer_id: 19,
        uid: 4,
      },
      {
        answer_id: 20,
        uid: 3,
      },
      {
        answer_id: 22,
        uid: 2,
      },
      {
        answer_id: 23,
        uid: 1,
      },
      {
        answer_id: 23,
        uid: 4,
      },
      {
        answer_id: 23,
        uid: 6,
      },
      {
        answer_id: 24,
        uid: 5,
      },
      {
        answer_id: 27,
        uid: 3,
      },
      {
        answer_id: 27,
        uid: 6,
      },
      {
        answer_id: 29,
        uid: 3,
      },
      {
        answer_id: 29,
        uid: 6,
      },
      {
        answer_id: 29,
        uid: 1,
      },
      {
        answer_id: 30,
        uid: 4,
      },
      {
        answer_id: 30,
        uid: 2,
      },
      {
        answer_id: 31,
        uid: 4,
      },
      {
        answer_id: 34,
        uid: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("votes", null, {});
  },
};
