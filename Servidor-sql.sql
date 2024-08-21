mkdir auth-example
cd auth-example
npm init -y
npm install express sqlite3 body-parser bcryptjs jsonwebtoken 

auth-example/
│
├── server.js
├── db.js
└── .gitignore

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Para producción, usa un archivo de base de datos

db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
    )`);
});

module.exports = db;