import { Box, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useLoginMutation } from './api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './redux/authSlice';

// Based on https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/authentication?from-embed=&file=/src/features/auth/Login.tsx:2095-2227

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    async function submit() {
        const result = await login({
            user: {
                username,
                password,
            }
        }).unwrap();
        
        const token = result.data.token;
        dispatch(setCredentials({token, username}));
        navigate("/profile");
    }

    return (
        <Box alignContent="center">
            <Typography variant="h3" textAlign="center">Log In</Typography>

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
                    Login
                </Button>
            </Box>
            
            <Link to="/account/register">Don't have an account? Sign Up</Link>

        </Box>
    );
}
