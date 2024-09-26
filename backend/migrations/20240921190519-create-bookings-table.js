'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      passengerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // name of the Users table
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // name of the Users table
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      pickupLocation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fare: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('REQUESTED', 'PENDING', 'CONFIRMED', 'CANCELLED'),
        defaultValue: 'CONFIRMED'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
