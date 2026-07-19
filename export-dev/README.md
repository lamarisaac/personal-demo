# Task Manager API (Demo)

A minimal Task Manager REST API, built as a sample project for demonstrating
automated code review tooling (e.g. CodeRabbit) on a pull request.

## Endpoints

- `POST /api/users/register` — create an account
- `POST /api/users/login` — get a JWT
- `GET /api/tasks` — list your tasks (paginated)
- `POST /api/tasks` — create a task
- `DELETE /api/tasks/:id` — delete a task

## Running locally

```bash
export JWT_SECRET=some-local-dev-secret
npm install
npm start
```

## Branches

- `main` — the baseline, reviewed implementation.
- `dev` — a feature branch with a batch of changes pending review.
