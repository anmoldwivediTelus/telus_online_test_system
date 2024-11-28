import { config } from "dotenv";
import app from "./app.js";
import path from "path";
import connectBD from "./dataBase/connectDB.js";
import router from './routes/routes.js';
import inviteRouter from './routes/inviteRouter.js';
import express from "express";
import cors from 'cors';

// // Define the path to your .env file
//  const envPath = path.resolve("");
//  console.log(envPath)

// // Load the .env file
//  const result = config({ path: envPath });
 config()

// if (result.error) {
//   // If there's an error loading the .env file
//   console.error("Error loading .env file:", result.error);
// } else {
//   // Log success message and loaded variables
//   console.log(".env loaded successfully:", result.parsed);
// }

// Access environment variables
const PORT = process.env.PORT || 4000;
console.log("PORT:", process.env.PORT)

app.use(express.json());
app.use(cors());

// If using forms or URL-encoded payloads:
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use('/api/invites', inviteRouter);
connectBD()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listening at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`failed to start the server, the error is: ${error.message}`);
  });

