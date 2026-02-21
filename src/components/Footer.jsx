import { AppBar, Typography } from '@mui/material';

export default function Footer() {
    const thisYear = new Date().getFullYear();

    return (
        <AppBar position="sticky" component="footer" sx={{ backgroundColor: '#C46D1B', color: '#ffffff', padding: 2, textAlign: 'center' }}>
            <Typography variant="body2">&copy; {thisYear} CodeCraft Labs. All rights reserved.</Typography>
        </AppBar>
    )
}