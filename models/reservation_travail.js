'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservation_travail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.reservation, { foreignKey: 'reservationId' });
      this.belongsTo(models.travail, { foreignKey: 'travailId', as: 'travail' });
    }
  }

  reservation_travail.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    nbreTechnicien: {
      type: DataTypes.INTEGER,
    },
    nbreObjet: {
      type: DataTypes.INTEGER,
    },
    MatierObjet: {
      type: DataTypes.STRING,
    },
    reservationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    travailId: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'reservation_travail',
  });
  return reservation_travail;
};