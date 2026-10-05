
// Endpoints:
// - GET  /api/health  -> 200 { status: "ok" }
// - POST /api/users   -> 201 with created user, 400 if name/email missing

// Commands:
// - npm install
// - npm start          # runs server on port 3000
// - npm test           # plain jest
// - npm run test:ci    # jest + "All tests passed" / "Tests failed" message, non-zero exit on failure
// EOF
const express = require('express');

const app = express();
app.use(express.json());

const users = [];

// Endpoint 1: health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Endpoint 2: create a user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json(user);
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;