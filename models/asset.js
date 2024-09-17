module.exports = (sequelize, DataTypes) => {
    const Asset = sequelize.define('Asset', {
      serialNumber: DataTypes.STRING,
      uniqueId: DataTypes.STRING,
      make: DataTypes.STRING,
      model: DataTypes.STRING,
      status: DataTypes.STRING,
      assignedEmployeeId: DataTypes.INTEGER,
      assetCategoryId: DataTypes.INTEGER
    }, {});
  
    Asset.associate = function(models) {
      // Define associations here
      Asset.belongsTo(models.Employee, { foreignKey: 'assignedEmployeeId' });
      Asset.belongsTo(models.AssetCategory, { foreignKey: 'assetCategoryId' });
      Asset.hasMany(models.AssetHistory, { foreignKey: 'assetId' });
    };
  
    return Asset;
  };
  