import { Box, Typography, Button, TextField, Link } from '@mui/material';
import { useSelector } from 'react-redux';




export function Home() {
    const username = useSelector(state => state.auth.username) || "Stranger";

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', 
        }}>
            <Typography variant="h3" textAlign="center">Stranger's Things</Typography>
            <Typography variant="h5" textAlign="center">Signed in as: {username}.</Typography>
            <a href="/profile">
                <Button variant="outlined" color="primary">SEE PROFILE</Button>
            </a>
        </Box>
    );
}