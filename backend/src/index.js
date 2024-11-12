import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

import app from "./app.js";
import connectBD from "./dataBase/connectDB.js";

const DATABASE_URL = process.env.DATABASE_URI;
const PORT = process.env.PORT;

connectBD(DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listing at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`failed to start the server, the error is: ${error.message}`);
  });
