"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line require-jsdoc
  class Level extends Model {
    // eslint-disable-next-line require-jsdoc
    static associate(models) {
      // define association here
    }
  }

  Level.init({
    level_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    level_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    req_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "levels",
    modelName: "Level",
  });
  return Level;
};
