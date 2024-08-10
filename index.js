import express from 'express';
import turso from './db.js';
import { getTodos, getTodoById, createTodo, deleteTodo, updateTodo } from './todo_controller.js';

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

app.get("/todos", getTodos);
app.get("/todos/:id", getTodoById);
app.post("/todos", createTodo);
app.put("/todos/:id", updateTodo);
app.delete("/todos/:id", deleteTodo);

const port = parseInt(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
