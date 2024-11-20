import sequelize from './../dataBase/sequelize.js';
import Test from './test.js';
import Question from './question.js';

// Define relationships
Test.hasMany(Question, {
  foreignKey: 'testId',
  onDelete: 'CASCADE',
});

Question.belongsTo(Test, {
  foreignKey: 'testId',
});

// Export models
export { sequelize, Test, Question };
