module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        registrationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    // Associate Vehicle with User (Driver)
    Vehicle.associate = function (models) {
        Vehicle.belongsTo(models.User, { foreignKey: 'driverId', as: 'driver' });
    };

    return Vehicle;
};
