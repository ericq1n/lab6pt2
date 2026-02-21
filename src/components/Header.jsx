import { Link as ReactLink } from 'react-router-dom';
import {AppBar, Toolbar, Box, Link} from '@mui/material';
import { useName } from '../context/NameContex';

export default function Header() {
    const { name } = useName();

    return (
        <Box component="nav">
            <AppBar position="static" sx={{backgroundColor:'#C46D1B'}}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1>Welcome {name} to <span id="txt-red">CodeCraft</span> Labs Intranet</h1>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Link component={ReactLink} to="/" underline='hover' sx={{ color: 'white', fontWeight: 'bold', padding: 2 }}>Home</Link>
                        <Link component={ReactLink} to="/employeemngmt" underline='hover' sx={{ color: 'white', fontWeight: 'bold', padding: 2 }}>Employee Management</Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}