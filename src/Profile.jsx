import { Box, Typography, Button, TextField, Link } from '@mui/material';
import { useSelector } from 'react-redux';




export function Profile() {
    const username = useSelector(state => state.auth.username) || "Stranger";

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant="h3" textAlign="center">Welcome back, {username}.</Typography>
            <Typography variant="h6" textAlign="center">Receieved Messages:</Typography>
            <Typography variant="h6" textAlign="center">Sent Messages:</Typography>
        </Box>
    );
}