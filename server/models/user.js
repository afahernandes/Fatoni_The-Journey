"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Journey, {
        as: "Journeys",
        foreignKey: {
          name: "userId",
        },
      });

      User.hasMany(models.Comment, {
        as: "Comments",
        foreignKey: {
          name: "userId",
        },
      });
      User.hasMany(models.Bookmark, {
        as: "Bookmarks",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
