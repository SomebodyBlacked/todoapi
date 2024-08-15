import express from 'express';
import turso from './db.js';
import { getTodos, getTodoById, createTodo, deleteTodo, updateTodo } from './todo_controller.js';

const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.json({ message: `Hello World!` });
});

app.get("/now", async function (req, res) {
  const query = "SELECT DATETIME('now');"
  const { rows } = await turso.execute(query);
  res.json(rows[0]);
})

app.get("/todos", getTodos);
app.get("/todos/:id", getTodoById);
app.post("/todos", createTodo);
app.put("/todos/:id", updateTodo);
app.delete("/todos/:id", deleteTodo);

const port = parseInt(process.env.PORT) || 3000;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
