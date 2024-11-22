import sequelize from './sequelize.js'; 


const connectDB = async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Database connection has been established successfully.');

    
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); 
  }
};

export default connectDB;
