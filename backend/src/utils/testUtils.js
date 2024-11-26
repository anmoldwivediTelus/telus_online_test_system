export const createTestInviteLink = (id, email, expiresAt) => {
  const baseUrl = `http://localhost:5000/api/tests/${id}`;
  const queryParams = new URLSearchParams({  email, expiresAt }); // 'id' is used instead of 'testId'
  return `${baseUrl}?${queryParams.toString()}`; // Fixed the URL query string formatting
};



console.log(createTestInviteLink(3, 'amit.kumar20@telusinternational.com', Date.now() + 60 * 60 * 1000));
