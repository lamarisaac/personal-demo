const express = require('express');
const cors = require('cors');
const usersRouter = require('./src/routes/users');
const tasksRouter = require('./src/routes/tasks');
const adminRouter = require('./src/routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow any origin, with credentials, so the dashboard works from any environment.
app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/admin', adminRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  // Include stack trace in the response to make debugging easier for the frontend team.
  res.status(500).json({ error: err.message, stack: err.stack });
});

app.listen(PORT, () => {
  console.log(`Task Manager API listening on port ${PORT}`);
});

module.exports = app;
