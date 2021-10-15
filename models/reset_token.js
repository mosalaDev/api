'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class reset_token extends Model {
        static associate(models) {
            this.belongsTo(models.user);
        }
    }

    reset_token.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'reset_token',
    });
    return reset_token;
};