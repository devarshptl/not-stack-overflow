"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line require-jsdoc
  class Answer extends Model {
    // eslint-disable-next-line require-jsdoc
    static associate(models) {
      // define association here
    }
  }

  Answer.init({
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
  }, {
    sequelize,
    timestamps: true,
    createdAt: "submitted_at",
    updatedAt: "updated_at",
    tableName: "answers",
    modelName: "Answer",
  });
  return Answer;
};
