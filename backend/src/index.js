import {config} from "dotenv";
import app from "./app.js";
import connectBD from "./dataBase/connectDB.js";
import router from './routes/routes.js';
config();
const DATABASE_URL = process.env.DATABASE_URI;
const PORT = process.env.PORT || 5000;
console.log(process.env.PORT)
app.use('/api', router); 
connectBD(DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listing at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`failed to start the server, the error is: ${error.message}`);
  });
