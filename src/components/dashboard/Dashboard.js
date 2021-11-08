
import React, { useEffect, useState} from 'react'
import Popup from "./Popup";
import DataTable from "./DataTable";

import { Button, Alert, Stack, Paper } from '@mui/material';
import axios from "axios";
import { useAuth } from '../../context/auth-context';
import { useNavigate, Navigate } from 'react-router-dom';
import notiSound from '../../sounds/notification-sound.wav';
import { Box } from '@mui/system';
import { red, grey, green } from '@mui/material/colors';

export default function Dashboard() {

    const { loggedIn, getCurrentUser } = useAuth();
    const [dataList, setDataList] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [msg, setMessage] = useState("");
    const [reqStatus, setReqStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, [])


    function setMsg(val) {
        setMessage(val);
        const notiAudio = new Audio(notiSound);
        notiAudio.play();
    }

    async function getData() {

        let currentUser = getCurrentUser();

        const data = {
            userId: currentUser.data.id,
            role: currentUser.data.role

        }
        let token = currentUser.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params: data
        };

        await axios.get(`${process.env.REACT_APP_API_HOST}/users/workout`, config)
            .then((response) => {
                if (response.data.success > 0) {
                    setDataList(response.data.rows);
                }
                else {
                    setReqStatus(false);
                    setMsg(response.data.message);
                }



            }).catch((err) => {
                setReqStatus(false);
                //let errMsg = ;
                setMsg(err.message.toString());
            });

    }

    /*
    Suspend or Unsuspend User
    ***/
    async function suspend(id, activeStatus) {

        let currentUser = getCurrentUser();

        const data = {
            id: id,
            active: activeStatus
        };

        let token = currentUser.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        await axios.patch(`${process.env.REACT_APP_API_HOST}/users/suspend`, data, config)
            .then((response) => {
                if (response.data.success > 0) {
                    setReqStatus(true);
                }
                else {
                    setReqStatus(false);

                }
                setMsg(response.data.message);
                getData();
            }).catch((err) => {
                setReqStatus(false);
                //let errMsg = ;
                setMsg(err.message.toString());
            });
    }


    async function submit(status, note) {

        let currentUser = getCurrentUser();

        const data = status == 0 ? {
            userId: currentUser.data.id,
            status: status
        } : {
            userId: currentUser.data.id,
            status: status,
            note: note
        };

        let token = currentUser.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        await axios.post(`${process.env.REACT_APP_API_HOST}/users/workout`, data, config)
            .then((response) => {
                if (response.data.success > 0) {
                    setReqStatus(true);
                }
                else {
                    setReqStatus(false);

                }
                setMsg(response.data.message);
                getData();
            }).catch((err) => {
                setReqStatus(false);
                //let errMsg = ;
                setMsg(err.message.toString());
            });


    }

    return (

        loggedIn ?
            <Box sx={{p:2, width:'100%'}} maxWidth="md">
                {msg != "" && <Alert severity={`${reqStatus ? "success" : "error"}`}>{msg}</Alert>}
                <br />
                <Stack spacing={6} direction="row" sx={{pb:2}}>
                    <Button variant="outlined" size="small" sx={{ bgcolor: green[500]}} onClick={() => { submit(0) }}>Register</Button>
                    <Button variant="outlined" size="small" sx={{ bgcolor: red[300]}}><Popup variant="outlined" onSubmit={submit}></Popup></Button>
                </Stack>
                <br />
                {openModal && <Popup closeModal={setOpenModal} />}
                {dataList ? <DataTable results={dataList} onSuspend={suspend} loginUserRole={getCurrentUser().data.role} /> : null}

            </Box> : <Navigate to="/" />


    )

}