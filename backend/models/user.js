const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('passenger', 'driver'),
            allowNull: false,
        },
        driverStatus: {
            type: DataTypes.ENUM('AVAILABLE', 'BUSY'),
            defaultValue: 'AVAILABLE',
        },
        location: {
            type: DataTypes.STRING,
        },
    }, {});

    // Associate User with Bookings and Vehicles
    User.associate = function (models) {
        User.hasMany(models.Booking, { foreignKey: 'passengerId', as: 'passengerBookings' });
        User.hasMany(models.Booking, { foreignKey: 'driverId', as: 'driverBookings' });
        User.hasMany(models.Vehicle, { foreignKey: 'driverId', as: 'vehicles' });
    };

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
};
