// models/Result.js
import { DataTypes } from "sequelize";
import sequelize from './../dataBase/sequelize.js';

const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  testId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attempted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  unattemptedQuestions:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  correct: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  incorrect: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalMarks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalTimeTaken: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  averageTimePerQuestion: {
    type: DataTypes.FLOAT,
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
  tableName: 'results',
  timestamps: true,
});

export default Result;