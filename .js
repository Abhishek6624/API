const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory user database
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

// Regular expressions for username and password validation
const usernameRegex = /^[a-zA-Z0-9]{6,12}$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"|,.<>/?]{6,}$/;

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate username and password
  if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
    res.status(400).json({ error: 'Invalid username or password' });
    return;
  }

  // Check if the provided username and password match a user in the database
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
