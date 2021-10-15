'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class certificat extends Model {
        static associate(models) {
            this.belongsTo(models.artisan, { foreignKey: 'artisanId' });
            this.belongsTo(models.service, { foreignKey: 'serviceId' });
        }
    }

    certificat.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        etique: {
            type: DataTypes.STRING,
        },
        artisanId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        serviceId: {
            type: DataTypes.UUID,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'certificat',
    });
    return certificat;
};