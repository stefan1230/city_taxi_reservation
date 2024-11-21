'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Reference the 'Users' table
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      passengerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Reference the 'Users' table
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ratings');
  },
};
