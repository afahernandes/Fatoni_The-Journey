'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bookmark.belongsTo(models.User, {
        as: "Users",
        foreignKey: {
          name: "userId",
        },
      });

      Bookmark.belongsTo(models.Journey, {
        as: "Journeys",
        foreignKey: {
          name: "idJourney",
        },
      });
    }
  };
  Bookmark.init({
    idJourney: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};