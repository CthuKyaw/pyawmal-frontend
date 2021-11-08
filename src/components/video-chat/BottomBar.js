import React, { useCallback } from 'react';
import styled from 'styled-components';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CallEndIcon from '@mui/icons-material/CallEndRounded';
import ChatBubbleIcon from '@mui/icons-material/QuestionAnswerSharp';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicOnIcon from '@mui/icons-material/Mic';
import SwitchCameraIcon from '@mui/icons-material/FlipCameraIos';
import VideocamOnIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { styled as styles } from '@mui/material/styles';


import { Fab, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { orange, pink } from '@mui/material/colors';

const BottomBar = ({
  clickChat,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices
}) => {
  const handleToggle = useCallback(
    (e) => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );

  const StyleFab = styles(Fab)`
    margin-right:1rem;
    opacity:0.7;
  `

  return (
    <>
    <Box sx={{ display:'flex', justifyContent:'center'}}>
    {showVideoDevices && (
      <SwitchList>
        {videoDevices.length > 0 &&
          videoDevices.map((device) => {
            console.log(device);
            return <div>{device.label}</div>;
          })}
        <div>Switch Camera</div>
      </SwitchList>
    )}
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <StyleFab onClick={toggleCameraAudio} data-switch='video'>
        {userVideoAudio.video ? (
          <VideocamOnIcon sx={{ fontSize: '2rem', color: 'green' }}></VideocamOnIcon>
        ) : (
          <VideocamOffIcon sx={{ fontSize: '2rem', color: 'red' }}></VideocamOffIcon>
        )}
      </StyleFab>
      
      <StyleFab onClick={toggleCameraAudio} data-switch='audio'>
        {userVideoAudio.audio ? (
          <MicOnIcon sx={{ color: 'green', fontSize: '2rem' }}></MicOnIcon>
        ) : (
          <MicOffIcon sx={{ color: 'red', fontSize: '2rem' }}></MicOffIcon>
        )}

      </StyleFab>
      <StyleFab onClick={handleToggle}>
        <SwitchCameraIcon sx={{ fontSize: '2rem', color: pink[700] }}></SwitchCameraIcon>
      </StyleFab>

      <StyleFab onClick={clickScreenSharing} sx={{ color: orange[500] }}>
        <ScreenShareIcon sx={{ fontSize: '2rem' }}></ScreenShareIcon>
      </StyleFab>
      <StyleFab onClick={goToBack}>
        <CallEndIcon sx={{ fontSize: '3rem', color: 'red' }}></CallEndIcon>
      </StyleFab>

    </Box>
    </>
  );
};

const Bar = styled.div`
  position: relative;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;
const Left = styled.div`
  display: flex;
  align-items: center;

`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Right = styled.div``;

const ChatButton = styled.div`
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;

/*
const ScreenButton = styled.div`
  
  :hover {
    background-color: #fff;
    cursor: pointer;
    border-radius: 15px;
  }

`;*/

const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

const StopButton = styled.div`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 0.9375rem;
  line-height: 30px;
  margin-right: 15px;
  background-color: #ee2560;
  border-radius: 15px;

  :hover {
    background-color: #f25483;
    cursor: pointer;
  }
`;

const CameraButton = styled.div`
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: #ee2560;
  }

  .fa-video-slash {
    color: #ee2560;
  }
`;

const SwitchMenu = styled.div`
  display: flex;
  position: absolute;
  width: 20px;
  top: 7px;
  left: 80px;
  z-index: 1;

  :hover {
    background-color: #476d84;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  > i {
    width: 90%;
    font-size: calc(10px + 1vmin);
  }
`;

const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: auto;
  top: -115px;
  left: 80px;
  background-color: #4ea1d3;
  color: white;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  text-align: left;

  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;

    :not(:last-child):hover {
      background-color: #77b7dd;
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
`;

export default BottomBar;