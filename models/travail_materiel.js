'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class travail_materiel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      travail_materiel.belongsTo(models.travail, { foreignKey: 'travailId' });
      travail_materiel.belongsTo(models.materiel, { foreignKey: 'materielId' });
    }
  };
  travail_materiel.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    travailId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    materielId: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'travail_materiel',
  });
  return travail_materiel;
};