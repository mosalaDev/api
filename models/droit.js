'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class droit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.poste, { through: models.poste_droit, as: 'postes' });
        }
    }

    droit.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        explication: {
            type: DataTypes.STRING(100),
        },
        acces: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'droit',
    });
    return droit;
};