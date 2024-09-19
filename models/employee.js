'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {

    static associate(models) {
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
        model: 'AssetCategories', 
        key: 'id' 
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};

