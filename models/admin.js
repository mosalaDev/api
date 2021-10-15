'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class admin extends Model {
        static associate(models) {
            this.belongsTo(models.poste, { foreignKey: 'posteId', as: 'poste' });
        }
    }

    admin.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        nom: {
            type: DataTypes.STRING(30),
        },
        postnom: {
            type: DataTypes.STRING(20),
        },
        prenom: {
            type: DataTypes.STRING,
        },
        sexe: {
            type: DataTypes.ENUM,
            values: ['M', 'F'],
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
        },
        posteId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        mot_passe: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'admin',
    });
    return admin;
};