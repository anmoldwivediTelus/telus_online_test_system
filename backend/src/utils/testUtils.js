export const createTestInviteLink = (testId, email, expirationTime) => {
    // Generate a link with testId, email, and expiration timestamp
    return `http://localhost:5000/api/tests/start?testId=${testId}&email=${email}&expiresAt=${expirationTime}`;
  };
  