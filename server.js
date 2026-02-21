//NOTE: This file was created with the help of LLMs
//install dependencies
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database Connection
const db = mysql.createConnection({
    host: 'my-db.cr1b9933gaye.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Timdbpw10',
    database: 'ericdb',
    port: 3306
});

db.connect(err => {
    if (err) console.error('Error connecting to RDS:', err);
    else console.log('Connected to Amazon RDS MySQL');
});

// 2. CRUD ROUTES
// READ: Get all employees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM Employees', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// CREATE: Add a new employee
app.post('/employees', (req, res) => {
    const { first_name, last_name, email, birthdate, salary } = req.body;
    const sql = 'INSERT INTO Employees (first_name, last_name, email, birthdate, salary) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, email, birthdate, salary], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, ...req.body });
    });
});

// DELETE: Remove an employee
app.delete('/employees/:id', (req, res) => {
    db.query('DELETE FROM Employees WHERE id = ?', [req.params.id], (err,) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, deletedId: req.params.id });
    });
});

// UPDATE: Edit an employee
app.put('/employees/:id', (req, res) => {
    const { first_name, last_name, email, birthdate, salary } = req.body;
    const sql = 'UPDATE Employees SET first_name=?, last_name=?, email=?, birthdate=?, salary=? WHERE id=?';
    db.query(sql, [first_name, last_name, email, birthdate, salary, req.params.id], (err,) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: req.params.id, ...req.body });
    });
});

//Start server on port 5000
app.listen(5000, () => console.log('Server running on port 5000'));