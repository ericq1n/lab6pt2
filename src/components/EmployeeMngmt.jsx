//NOTE: This file was created with the help of LLMs
import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Box, Stack } from '@mui/material';

export default function EmployeeMngmt() {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        birthdate: '',
        salary: ''
    });
    const [editingId, setEditingId] = useState(null);

    //Fetch employees from the server
    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5000/employees');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    //useEffect to trigger refetching when the component mounts
    useEffect(() => {
        fetchEmployees();
    }, []);

    //Delete employee function
    // 2. Delete Employee Function
    const deleteEmployee = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            await fetch(`http://localhost:5000/employees/${id}`, { method: 'DELETE' });
            fetchEmployees(); // Refresh the list
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const startEdit = (employee) => {
        const birthdate = employee.birthdate
            ? (String(employee.birthdate).slice(0, 10))
            : '';
        setFormData({
            first_name: employee.first_name || '',
            last_name: employee.last_name || '',
            email: employee.email || '',
            birthdate,
            salary: employee.salary ?? ''
        });
        setEditingId(employee.id);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ first_name: '', last_name: '', email: '', birthdate: '', salary: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const response = await fetch(`http://localhost:5000/employees/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    cancelEdit();
                    fetchEmployees();
                }
            } else {
                const response = await fetch('http://localhost:5000/employees', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    cancelEdit();
                    fetchEmployees();
                }
            }
        } catch (error) {
            console.error(editingId ? 'Error updating employee:' : 'Error adding employee:', error);
        }
    };

    return (
        <>
            <section>
                <h2>Employee List</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>First Name</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Last Name</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>BirthDate</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Salary</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.first_name}</TableCell>
                                <TableCell>{employee.last_name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.birthdate}</TableCell>
                                <TableCell>{employee.salary}</TableCell>
                                <TableCell>
                                        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => startEdit(employee)}>Edit</Button>
                                        <Button variant="contained" color="error" onClick={() => deleteEmployee(employee.id)}>
                                            Delete
                                        </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </section>

            <section>
                <h2>{editingId ? 'Edit Employee' : 'Add New Employee'}</h2>
                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mt: 2 }}>
                    <Stack spacing={2}>
                        <TextField
                            label="First Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleFormChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleFormChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Birthdate"
                            name="birthdate"
                            type="date"
                            value={formData.birthdate}
                            onChange={handleFormChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <TextField
                            label="Salary"
                            name="salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleFormChange}
                            inputProps={{ min: 0, step: 0.01 }}
                            fullWidth
                        />
                        <Stack direction="row" spacing={1}>
                            <Button type="submit" variant="contained" color="primary">
                                {editingId ? 'Update Employee' : 'Add Employee'}
                            </Button>
                            {editingId && (
                                <Button type="button" variant="outlined" onClick={cancelEdit}>
                                    Cancel
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </section>
        </>
    )
}