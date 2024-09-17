'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Employee.belongsTo(models.AssetCategory, { foreignKey: 'assetCategoryId' });
    }
  }
  Employee.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    designation: DataTypes.STRING,
    assetCategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'AssetCategories', // The table name in the database
        key: 'id' // The primary key in the AssetCategory model
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};
