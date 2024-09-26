module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        passengerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pickupLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fare: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('REQUESTED', 'PENDING', 'CONFIRMED', 'CANCELLED'),
            defaultValue: 'PENDING',
        }
    }, {});

    // Alias associations to prevent Sequelize conflicts
    Booking.associate = function (models) {
        Booking.belongsTo(models.User, { foreignKey: 'passengerId', as: 'passenger' });
        Booking.belongsTo(models.User, { foreignKey: 'driverId', as: 'driver' });
    };

    return Booking;
};