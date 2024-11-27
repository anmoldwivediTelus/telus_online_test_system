import sequelize from './../dataBase/sequelize.js';
import Test from './test.js';
import Question from './question.js';
import Result from './Result.js';
import User from './user.js'

// Define relationships
Test.hasMany(Question, { foreignKey: 'testId', onDelete: 'CASCADE' });
Question.belongsTo(Test, { foreignKey: 'testId' });

Test.hasMany(Result, { foreignKey: 'testId' });
Result.belongsTo(Test, { foreignKey: 'testId' });

Result.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Result, { foreignKey: 'userId' });

// Export models
export { sequelize, Test, Question, Result };
