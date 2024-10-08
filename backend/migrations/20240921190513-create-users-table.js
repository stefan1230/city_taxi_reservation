'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('passenger', 'driver'),
        allowNull: false
      },
      driverStatus: {
        type: Sequelize.ENUM('AVAILABLE', 'BUSY'),
        defaultValue: 'AVAILABLE'
      },
      location: {
        type: Sequelize.STRING
      },
      // Add vehicle-related fields for drivers
      registrationNumber: {
        type: Sequelize.STRING,
        allowNull: true,  // Only applicable to drivers
        unique: true
      },
      vehicleModel: {
        type: Sequelize.STRING,
        allowNull: true  // Only applicable to drivers
      },
      vehicleColor: {
        type: Sequelize.STRING,
        allowNull: true  // Only applicable to drivers
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
