import { Sequelize } from "sequelize";
const sequelize = new Sequelize('telus_online_test_system', 'anmoldwivedi', 'anmol1997', {
    host: 'localhost',
    dialect:  'postgres',
    logging: console.log
  });
export default sequelize;