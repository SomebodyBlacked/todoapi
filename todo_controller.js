import turso from './db.js';

export async function getTodos(req, res) {
    try {
        const todos = await turso.execute('SELECT * FROM todos');
        res.json(todos.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching todos' });
    }
};

export async function getTodoById(req, res) {
    const { id } = req.params;
    try {
        const { rows } = await turso.execute('SELECT * FROM todos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching todo' });
    }
};

export async function createTodo(req, res) {
    const { task } = req.query;
    try {
        const newTodo = await turso.execute(`INSERT INTO todos (task) VALUES ('${task}')`);
        res.status(201).json({ message: 'Todo created', id: newTodo.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating todo' });
    }
};

export async function updateTodo(req, res) {
    const { id } = req.params;
    const { task } = req.query;
    try {
        const updatedTodo = await turso.execute(`UPDATE todos SET task = '${task}' WHERE id = ${id}`);
        if (updatedTodo.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating todo' });
    }
};

export async function deleteTodo(req, res) {
    const { id } = req.params;
    try {
        const deletedTodo = await turso.execute('DELETE FROM todos WHERE id = ?', [id]);
        if (deletedTodo.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting todo' });
    }
};
