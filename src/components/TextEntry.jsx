import { TextField, Button, Box } from '@mui/material';
import { useName } from '../context/NameContex';
import { useState } from 'react';


export default function TextEntry() {
    const { setNameValue } = useName();
    const [localName, setLocalName] = useState('');

    const handleChange = (e) => {
        setLocalName(e.target.value);
    }

    return (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
            <TextField label="Enter your text" variant="outlined" value={localName} onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={() => setNameValue(localName)}>Submit</Button>
        </Box>
    )
}
