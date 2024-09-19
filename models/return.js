// models/return.js
module.exports = (sequelize, DataTypes) => {
  const Return = sequelize.define('Return', {
    assetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'returns',
  });

  return Return;
};
