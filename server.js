//NOTE: This file was created with the help of LLMs
import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect(err => {
    if (err) console.error('Error connecting to RDS:', err);
    else console.log('Connected to Amazon RDS MySQL');
});

// 2. CRUD ROUTES
// READ: Get all employees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// CREATE: Add a new employee
app.post('/employees', (req, res) => {
    const { first_name, last_name, email, birthdate, salary } = req.body;
    const sql = 'INSERT INTO employees (first_name, last_name, email, birthdate, salary) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, email, birthdate, salary], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, ...req.body });
    });
});

// DELETE: Remove an employee
app.delete('/employees/:id', (req, res) => {
    db.query('DELETE FROM employees WHERE employee_id = ?', [req.params.id], (err,) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, deletedId: req.params.id });
    });
});

// UPDATE: Edit an employee
app.put('/employees/:id', (req, res) => {
    const { first_name, last_name, email, birthdate, salary } = req.body;
    const sql = 'UPDATE employees SET first_name=?, last_name=?, email=?, birthdate=?, salary=? WHERE employee_id=?';
    db.query(sql, [first_name, last_name, email, birthdate, salary, req.params.id], (err,) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: req.params.id, ...req.body });
    });
});

//Start server on port 5000
app.listen(5000, () => console.log('Server running on port 5000'));