import React, { useEffect, useState } from 'react';
import axios from "axios";
import { TextField, Button, Stack, Typography, Alert, Paper } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useFormik } from 'formik';
import { useAuth } from '../../context/auth-context';
import { userValidationSchema } from '../../validations/user-validation';
import notiSound from '../../sounds/notification-sound.wav';
import { Box } from '@mui/system';

export default function CreateUser() {


    const navigate = useNavigate();
    const { loggedIn, getCurrentUser } = useAuth();

    if (!loggedIn || getCurrentUser().data.role > 1) {
        navigate("/");
    }


    const [role, setRole] = useState("2");
    const [msg, setMessage] = useState("");
    const [reqStatus, setReqStatus] = useState(false);
    const [loggedInUserRole, setLoggedInUserRole] = useState("2");

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: (values) => {
            createUser(values);
        },
        validationSchema: userValidationSchema
    });

    function setMsg(val) {
        setMessage(val);
        const notiAudio = new Audio(notiSound);
        notiAudio.play();
    }

    const createUser = async (data) => {

        let currentUser = getCurrentUser();

        const payLoad = {
            "user_name": data.username,
            "password": data.password,
            "role": role,
            "parent_id": currentUser.data.id
        };

        let token = currentUser.token;

        const config = { headers: { Authorization: `Bearer ${token}` } };
        let error;
        let response;

        try {
            response = await axios.post(`${process.env.REACT_APP_API_HOST}/users`, payLoad, config)
                .catch((err) => {
                    throw err;
                });
        }
        catch (err) {
            error = err;
        }

        if (!error) {
            if (response.data.success > 0) {
                setReqStatus(true);

            }
            else {
                setReqStatus(false);

            }
            setMsg(response.data.message);
            formik.resetForm();
        }
        else {
            setReqStatus(false);
            setMsg(error.message);
        }
    }
    return (

        loggedIn ?
            <Box sx={{ mt: 5, width:'100%' }} maxWidth="sm">
                <Paper elevation={1} sx={{ p: 2, pr: 5, pl: 5, pt: 5 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2} direction="column">
                            <Typography variant="h5" align="center">
                                Create Account
                            </Typography>

                            <TextField label="user name" variant="outlined" name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                onBlur={formik.handleBlur} autoComplete="off">
                            </TextField>

                            <TextField label="password" type="password" variant="outlined" name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                onBlur={formik.handleBlur}></TextField>


                            {
                                getCurrentUser().data.role === 0 && //If Super Admin
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Role</FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="controlled-radio-buttons-group"
                                        value={role}
                                        onChange={(e) => { setRole(e.target.value) }}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Admin" />
                                        <FormControlLabel value="2" control={<Radio />} label="User" />
                                    </RadioGroup>
                                </FormControl>
                            }


                            {msg != "" && <Alert severity={`${reqStatus ? "success" : "error"}`}>{msg}</Alert>}
                            <br />
                            <Button type="submit" variant="contained" color="primary">Create Account</Button>

                        </Stack>
                    </form>
                </Paper>
            </Box>
            : <Navigate to="/" />

    );
}


