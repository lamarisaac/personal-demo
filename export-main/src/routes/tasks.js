const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

// All task routes require a valid auth token.
router.use(requireAuth);

router.get('/', (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const pageSize = Math.min(
    Math.max(parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE, 1),
    MAX_PAGE_SIZE
  );

  const allTasks = db.getTasksForUser(req.userId);
  const start = (page - 1) * pageSize;
  const paginated = allTasks.slice(start, start + pageSize);

  return res.json({
    page,
    pageSize,
    total: allTasks.length,
    tasks: paginated,
  });
});

router.post('/', (req, res) => {
  const { title } = req.body || {};

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const task = db.createTask({ title: title.trim(), ownerId: req.userId });
  return res.status(201).json(task);
});

router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = db.findTaskById(taskId);

  if (!task || task.ownerId !== req.userId) {
    return res.status(404).json({ error: 'Task not found' });
  }

  db.deleteTask(taskId);
  return res.status(204).send();
});

module.exports = router;
