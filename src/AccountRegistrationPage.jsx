import { Box, Typography, Button, TextField, Link } from '@mui/material';
import { useState } from 'react';
import { useRegisterUserMutation } from './api';
import { useNavigate } from 'react-router-dom';

// Based on https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/authentication?from-embed=&file=/src/features/auth/Login.tsx:2095-2227

export function AccountRegistrationPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();

    async function submit() {
        await registerUser({
            user: {
                username,
                password,
            }
        }).unwrap();
        navigate('/account/login');
    }

    return (
        <Box alignContent="center">
            <Typography variant="h3" textAlign="center">Sign Up</Typography>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <TextField
                    label="Username" variant="outlined" margin="normal" fullWidth required
                    value={username}
                    onChange={evt => setUsername(evt.target.value)}
                />
                <TextField
                    label="Password" type="password" variant="outlined" margin="normal" fullWidth required
                    value={password}
                    onChange={evt => setPassword(evt.target.value)}
                />
                <Button
                    variant="outlined" color="primary" fullWidth
                    disabled={username === "" || password === "" || isLoading }
                    onClick={submit}
                >
                    Sign Up
                </Button>
            </Box>
            
            <Link to="/account/login">Already have an account? Log In</Link>

        </Box>
    );
}
