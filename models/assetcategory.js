'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssetCategory extends Model {
    static associate(models) {
      AssetCategory.hasMany(models.Employee, { foreignKey: 'assetCategoryId' });
    }
  }
  AssetCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AssetCategory',
  });
  return AssetCategory;
};
