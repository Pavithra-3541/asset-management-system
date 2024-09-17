'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Employees', 'assetCategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'AssetCategories', // Name of the model to reference
        key: 'id'
      },
      allowNull: true, // Adjust according to your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Employees', 'assetCategoryId');
  }
};
