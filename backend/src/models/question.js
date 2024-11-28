// models/Question.js
import { DataTypes } from "sequelize";
import sequelize from './../dataBase/sequelize.js';

 const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  testId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  testName: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  questionText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSONB, 
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.TEXT, 
    allowNull: false,
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
  tableName: 'questions',
  timestamps: true,
});
Question.associate = (models) => {
  Question.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
};
export default Question;
