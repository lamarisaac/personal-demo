// Simple in-memory data store.
// In a real app this would be a database; kept in-memory here to keep the demo dependency-free.

const users = [];
const tasks = [];

let nextUserId = 1;
let nextTaskId = 1;

function createUser({ username, passwordHash }) {
  const user = { id: nextUserId++, username, passwordHash };
  users.push(user);
  return user;
}

function findUserByUsername(username) {
  return users.find((u) => u.username === username);
}

function findUserById(id) {
  return users.find((u) => u.id === id);
}

function createTask({ title, ownerId }) {
  const task = {
    id: nextTaskId++,
    title,
    ownerId,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function getTasksForUser(ownerId) {
  return tasks.filter((t) => t.ownerId === ownerId);
}

function findTaskById(id) {
  return tasks.find((t) => t.id === id);
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  createTask,
  getTasksForUser,
  findTaskById,
  deleteTask,
};
