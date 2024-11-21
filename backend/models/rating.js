module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        passengerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
    }, {});

    Rating.associate = function (models) {
        Rating.belongsTo(models.User, { foreignKey: 'driverId', as: 'driver' });
        Rating.belongsTo(models.User, { foreignKey: 'passengerId', as: 'passenger' });
    };

    return Rating;
};
