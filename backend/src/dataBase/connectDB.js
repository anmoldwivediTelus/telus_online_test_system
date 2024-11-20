import sequelize from './sequelize.js';

const connectBD = async (DB_URL) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectBD;