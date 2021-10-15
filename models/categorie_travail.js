'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categorie_travail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.travail, { through: models.categorie_travail_travail });
      this.hasMany(models.categorie_travail_travail);
    }
  };
  categorie_travail.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categorie_travail',
  });
  return categorie_travail;
};