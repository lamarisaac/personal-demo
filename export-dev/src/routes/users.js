const express = require('express');
const db = require('../db');
const { hashPassword, verifyPassword, signToken } = require('../auth');

const router = express.Router();

const USERNAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 8;

router.post('/register', async (req, res) => {
  const { username, password } = req.body || {};

  if (typeof username !== 'string' || username.trim().length < USERNAME_MIN_LENGTH) {
    return res.status(400).json({ error: `Username must be at least ${USERNAME_MIN_LENGTH} characters` });
  }

  if (typeof password !== 'string' || password.length < PASSWORD_MIN_LENGTH) {
    return res.status(400).json({ error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` });
  }

  if (db.findUserByUsername(username)) {
    return res.status(409).json({ error: 'Username already taken' });
  }

  const passwordHash = await hashPassword(password);
  const user = db.createUser({ username, passwordHash });

  return res.status(201).json({ id: user.id, username: user.username });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};

  console.log('login attempt', username, password);

  const user = db.findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const passwordMatches = await verifyPassword(password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken(user);
  return res.json({ token });
});

module.exports = router;
