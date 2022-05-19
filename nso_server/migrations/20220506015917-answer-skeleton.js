"use strict";

module.exports = {
  async up(queryInterface, {DataTypes}) {
    return queryInterface.createTable("answers", {
      answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      qid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      answer_desc: {
        type: DataTypes.TEXT,
      },
      best: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      submitted_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("answers");
  },
};
