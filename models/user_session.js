'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user_session extends Model {
        static associate(models) {
            this.belongsTo(models.user);
        }
    }

    user_session.init({
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
        modelName: 'user_session',
    });
    return user_session;
};