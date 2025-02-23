"use strict";

// Sequelize Migration Script
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("bosses", "neftie", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("bosses", "neftie");
  },
};
