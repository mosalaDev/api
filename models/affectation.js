'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class affectation extends Model {
        static associate(models) {
            this.belongsTo(models.artisan, { foreignKey: 'artisanId' });
            this.belongsTo(models.reservation, { foreignKey: 'reservationId' });
            this.hasOne(models.prestation, { foreignKey: 'prestationId' });
        }
    }

    affectation.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        reservationId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        artisanId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        prestationId: {
            type: DataTypes.UUID,
        }
    }, {
        sequelize,
        modelName: 'affectation',
    });
    return affectation;
};