"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line require-jsdoc
  class Topic extends Model {
    // eslint-disable-next-line require-jsdoc
    static associate(models) {
      // define association here
    }
  }

  Topic.init({
    topic_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topic_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    topic_desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "topics",
    modelName: "Topic",
  });
  return Topic;
};
