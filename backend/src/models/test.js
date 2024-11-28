import { DataTypes } from "sequelize";
import sequelize from './../dataBase/sequelize.js';
const Test = sequelize.define(
  'Test',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'tests',
    timestamps: true,
  }
);
Test.associate = (models) => {
  Test.hasMany(models.Question, { foreignKey: 'testId', onDelete: 'CASCADE' });
  Test.hasMany(models.Result, { foreignKey: 'testId' });
};
export default Test;