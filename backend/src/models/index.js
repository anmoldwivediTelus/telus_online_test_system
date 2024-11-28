import sequelize from './../dataBase/sequelize.js';
import Test from './test.js';
import Question from './question.js';
import Result from './Result.js';
import User from './user.js';

// Define relationships
Test.associate = (models) => {
    Test.hasMany(models.Question, { foreignKey: 'testId', onDelete: 'CASCADE' });
    Test.hasMany(models.Result, { foreignKey: 'testId' });
};
Question.associate = (models) => {
    Question.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
};
Result.belongsTo(Test, { foreignKey: 'testId' });

Result.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Result, { foreignKey: 'userId' });

// Export models
export { sequelize, Test, Question, Result };
