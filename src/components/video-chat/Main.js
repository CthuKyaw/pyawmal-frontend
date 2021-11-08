import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from './Socket';
import { v4 as uuid } from 'uuid';
import { useAuth } from '../../context/auth-context';
import { Navigate, useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton } from "@mui/material";
import VideoCallRounded from '@mui/icons-material/VideoCameraFrontRounded';
import { blue } from '@mui/material/colors';

const Main = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { loggedIn, getCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = roomRef.current;
        const userName = userRef.current;

        sessionStorage.setItem('user', userName);

        /*window.open(`/room/${roomName}`, '_blank', 'toolbar=0,location=0,menubar=0');*/
        
        window.open(`/room/${roomName}`, '_blank', 'toolbar=0,location=0,menubar=0');
        //navigate(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
  }, [props.history]);

  function clickJoin() {
    roomRef.current = uuid();
    let user = getCurrentUser();
    userRef.current = user.data.user_name;

    let roomName = roomRef.current;
    let userName = userRef.current;
    socket.emit('BE-check-user', { roomId: roomName, userName });
  }

  return (
    loggedIn ?
      <Box sx={{ mt: 10, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2">
          Create chat room
        </Typography>
        <IconButton onClick={clickJoin}>
          <VideoCallRounded sx={{ fontSize: '10rem', color: blue[400] }}></VideoCallRounded>
        </IconButton>

      </Box> : <Navigate to="/" />


  )

};


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;



export default Main;
