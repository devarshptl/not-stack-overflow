"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line require-jsdoc
  class User extends Model {
    // eslint-disable-next-line require-jsdoc
    static associate(models) {
      // define association here
    }
  }

  User.init({
    uid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gi,
      },
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    profile: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "users",
    modelName: "User",
  });
  return User;
};
