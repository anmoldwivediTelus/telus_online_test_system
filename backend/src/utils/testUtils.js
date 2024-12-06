export const createTestInviteLink = (id,userId) => {
  return `http://localhost:1234/test/${id}/${userId}`;
};

export const generateInviteEmailHTML = (id, userId,email,expiresAt, testName = 'React') => {
  const inviteLink = createTestInviteLink(id,userId);
  const formattedDate = new Date(expiresAt).toLocaleString();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${testName} Test Invitation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        p {
          color: #555;
          line-height: 1.6;
        }
        .cta {
          margin: 20px 0;
          text-align: center;
        }
        a.button {
          display: inline-block;
          padding: 12px 25px;
          font-size: 16px;
          color: #ffffff;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 5px;
        }
        a.button:hover {
          background-color: #0056b3;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #999;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Hello, ${email}!</h1>
        <p>You have been invited to take the <strong>${testName}</strong> test. Please click the button below to start.</p>
        <div class="cta">
          <a href="${inviteLink}" target="_blank" class="button">Start Test</a>
        </div>
        <p><strong>Note:</strong> This link will expire on <strong>${formattedDate}</strong>.</p>
        <p>If you have trouble clicking the button, you can use the following link:</p>
        <p><a href="${inviteLink}" target="_blank">${inviteLink}</a></p>
        <p class="footer">Best regards,<br>Telus Digital</p>
      </div>
    </body>
    </html>
  `;
};

// Example usage
//console.log(generateInviteEmailHTML(1, 'amit.kumar20@telusinternational.com', Date.now() + 60 * 60 * 1000, 'React'));
