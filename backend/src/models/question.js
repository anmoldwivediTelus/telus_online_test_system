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
  questionText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSONB, 
    allowNull: false,
  },
  correctOption: {
    type: DataTypes.INTEGER, 
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

export default Question;
