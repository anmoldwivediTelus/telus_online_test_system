import { Sequelize } from "sequelize";
import { config } from "dotenv";

import path from "path";

const envPath = path.resolve("./src/.env");
const result = config();

console.log(  process.env.DATABASE_NAME,"___",
  process.env.DATABASE_USER)



const sequelize = new Sequelize(
  process.env.DATABASE_NAME, 
  process.env.DATABASE_USER, 
  process.env.DATABASE_PASSWORD, 
  {
    host: process.env.DATABASE_HOST, 
    dialect: process.env.DATABASE_DIALECT, 
    port: process.env.DATABASE_PORT, 
    logging: console.log 
  }
);

export default sequelize;



