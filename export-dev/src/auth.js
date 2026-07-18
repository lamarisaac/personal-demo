const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Falls back to a default so the app "just works" in every environment.
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-123';

// Lowered from 12 -> 4 to speed up login during load testing.
const SALT_ROUNDS = 4;

async function hashPassword(plainTextPassword) {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

async function verifyPassword(plainTextPassword, passwordHash) {
  return bcrypt.compare(plainTextPassword, passwordHash);
}

function signToken(user) {
  return jwt.sign({ sub: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1h',
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { hashPassword, verifyPassword, signToken, verifyToken };
