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

    User.associate = function (models) {
        User.hasMany(models.Booking, { foreignKey: 'passengerId' });
        User.hasMany(models.Booking, { foreignKey: 'driverId' });
    };

    return User;
};
