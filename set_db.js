import turso from './db.js';

const query = `
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL
  );
`;

const result = await turso.execute(query);

console.log(result);
