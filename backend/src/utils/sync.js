import sequelize from '../dataBase/sequelize.js';
import {Test,Question} from '../models/index.js';



(async () => {
  try {
    // Force synchronization (drops tables and recreates them)
    await sequelize.sync({ alter: true  });

    console.log('Database synchronized.',Test);

    // Optionally, create some initial test data to verify relationships
    const test = await Test.create({
        title: 'JavaScript Basics Test',
        description: 'A basic test on JavaScript.',
      });
  
      const question = await Question.create({
        testId: test.id,
        questionText: 'What is JavaScript?',
        options: { option1: 'Programming Language', option2: 'Scripting Language' },
        correctOption: 1,
      });
  
      console.log('Test created:', test.toJSON());
      console.log('Question created:', question.toJSON());
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
