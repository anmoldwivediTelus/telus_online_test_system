import { config } from "dotenv";
import app from "./app.js";
import path from "path";
import connectBD from "./dataBase/connectDB.js";
import router from './routes/routes.js';


// // Define the path to your .env file
 const envPath = path.resolve("./src/.env");

// Load the .env file
 const result = config({ path: envPath });
// config({path:'../../.env'})

// if (result.error) {
//   // If there's an error loading the .env file
//   console.error("Error loading .env file:", result.error);
// } else {
//   // Log success message and loaded variables
//   console.log(".env loaded successfully:", result.parsed);
// }

// Access environment variables
const PORT = process.env.PORT || 5000;
console.log("PORT:", process.env.PORT);

app.use('/api', router);
connectBD()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listening at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`failed to start the server, the error is: ${error.message}`);
  });
