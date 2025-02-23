"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "picture", {
      type: Sequelize.STRING,
      allowNull: true,
      after: "username", // This will add the column after the username column
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "picture");
  },
};
