'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categorie_travail_travail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.travail, { foreignKey: 'travailId', as: 'categories' });
      this.belongsTo(models.categorie_travail, { foreignKey: 'categorieTravailId' });
    }
  };
  categorie_travail_travail.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    travailId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    categorieTravailId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'categorie_travail_travail',
  });
  return categorie_travail_travail;
};