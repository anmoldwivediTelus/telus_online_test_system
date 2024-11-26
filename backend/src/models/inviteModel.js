import sequelize from '../dataBase/sequelize.js';

const logTestInvite = async (email, testName, testLink, expirationTime) => {
 
  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  
  const expirationDate = new Date(expirationTimeInSeconds * 1000);

  const query = `
    INSERT INTO test_invites (email, test_name, test_link, expiration_time)
    VALUES ($1, $2, $3, $4)
  `;
  
  const values = [email, testName, testLink, expirationDate];
  
  try {
    await sequelize.query(query, { bind: values });
    console.log('Test invite logged successfully.');
  } catch (error) {
    console.error('Error logging test invite:', error);
    throw error;
  }
};

export { logTestInvite };