const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.VARCHAR(36),
      // allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    expires: {
      type: DataTypes.DATETIME,
      // allowNull: false,
    },
    data: {
      type: DataTypes.TEXT,
      // allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
    has_nuts: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'session',
  }
);

module.exports = Session;
