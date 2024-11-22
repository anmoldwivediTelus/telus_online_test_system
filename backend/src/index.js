import express from 'express';
import { config } from 'dotenv';
import userRoutes from './routes/user.js';
import connectDB from './dataBase/connectDB.js'; 
import inviteRouter from './routes/inviteRouter.js';
import morgan from 'morgan';

config(); 

const app = express();
app.use(express.json());


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/invites', inviteRouter);


app.get('/', (req, res) => {
  res.send('Hello Amit ANAND!');
});


const PORT = process.env.PORT || 5000;


(async () => {
  try {
    await connectDB(); // Connect to the database
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start the server: ${error.message}`);
    process.exit(1); 
  }
})();


process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});


process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});
