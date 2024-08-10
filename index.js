import express from 'express';
import turso from './db.js';

const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.json({ message: `Hello ${name}!` });
});

app.get("/now", async (req, res) => {
  const query = "SELECT DATETIME('now');"
  const result = await turso.execute(query);
  res.json(result);
})

app.get("/todos", (req, res) => {
  const todos = [
    { id: 1, title: "Todo 1" },
    { id: 2, title: "Todo 2" },
    { id: 3, title: "Todo 3" },
  ];
  res.json(todos);
})

const port = parseInt(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});