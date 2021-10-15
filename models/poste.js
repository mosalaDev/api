'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class poste extends Model {
        static associate(models) {
            this.hasMany(models.admin, { as: 'occupant' });
            this.belongsToMany(models.droit, { through: models.poste_droit, as: 'droits' });
        }
    }

    poste.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        code: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING(150),
        }
    }, {
        sequelize,
        modelName: 'poste',
    });
    return poste;
};