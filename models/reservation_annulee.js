'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class reservation_annulee extends Model {
        static associate(models) {
            this.belongsTo(models.reservation, { foreignKey: 'reservationId', as: 'reservation' });
        }
    }

    reservation_annulee.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        etat: {
            type: DataTypes.ENUM,
            values: ['effectif', 'en cours'],
            defaultValue: 'en cours'
        },
        motif: {
            type: DataTypes.STRING,
        },
        reservationId: {
            type: DataTypes.UUID,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'reservation_annulee',
    });
    return reservation_annulee;
};