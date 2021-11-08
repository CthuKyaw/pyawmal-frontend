
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { TextField, Button, Stack, Typography, Alert, Box, Paper, Icon } from "@mui/material";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import LockIcon from '@mui/icons-material/Lock';


const Login = () => {

    const { login, loggedIn } = useAuth();
    const [user_name, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [msg, setMsg] = useState("");

    useEffect(() => {
        console.log(`LoggedIn: ${loggedIn}`);
    }, [])


    function handleUserNameChange(val) {
        setUserName(val.target.value)
    }

    function handlePasswordChange(val) {
        setPassword(val.target.value);
    }

    function handleKeyPress(e) {
        if (e.charCode === 13) {
            handleSignIn();
        }
    }

    const handleSignIn = () => {
        const payLoad = { user_name, password };


        try {
            axios.post(`${process.env.REACT_APP_API_HOST}/users/login`, payLoad).then((response) => {
                if (response.data.success > 0) {
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    login();
                }
                else {
                    setMsg(response.data.message);
                }


            })
                .catch((err) => {
                    setMsg(err.message);
                });
        }
        catch (err) {
            setMsg(err.message);
        }


    }

    return (
        !loggedIn ?
            <Box sx={{ mt: 10, mb: 2, width:'100%' }} maxWidth="sm">
                <Paper elevation={1} sx={{ p: 2, pr:5, pl:5, pb:5 }}>
                    <Stack spacing={2} direction="column">
                        <Typography variant="h5" align="center">
                        <LockIcon></LockIcon>
                        </Typography>
                        <Typography variant="h5" align="center">
                            Sign In
                        </Typography>
                        <TextField label="user name"
                            onChange={handleUserNameChange} onKeyPress={handleKeyPress}></TextField>
                        <TextField label="password" type="password"
                            onChange={handlePasswordChange} onKeyPress={handleKeyPress}></TextField>

                        {msg != "" && <Alert severity="error">{msg}</Alert>}
                        <br />
                        <Button onClick={handleSignIn} variant="contained" color="primary">Sign In</Button>

                    </Stack>
                </Paper>

            </Box> : <Navigate to="/dashboard" />


    );
}

export default Login;
