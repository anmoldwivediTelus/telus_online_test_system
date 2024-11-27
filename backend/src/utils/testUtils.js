export const createTestInviteLink = (id, email, expiresAt) => {
  const baseUrl = `http://localhost:1234/api/tests/${id}`;
  //const queryParams = new URLSearchParams({  email, expiresAt }); // 'id' is used instead of 'testId'
  return `${baseUrl}`; // Fixed the URL query string formatting
};
//?${queryParams.toString(


console.log(createTestInviteLink(3, 'amit.kumar20@telusinternational.com', Date.now() + 60 * 60 * 1000));
