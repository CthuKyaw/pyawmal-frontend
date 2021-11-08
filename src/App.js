import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Paperbase from './components/Layout/Paper';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateUser from './components/create-user/CreateUser';
import ChatRoom from './components/video-chat/Main';
import Room from './components/video-chat/Room';
import FlexTest from './components/flex-test/FlexTest';

function App() {
  return (
    <>

      <Paperbase>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/create" element={<CreateUser />}></Route>
          <Route exact path="/chatroom" element={<ChatRoom />}></Route>
          <Route exact path="/room/:roomId" element={<Room />}></Route>
          <Route exact path="/test" element={<FlexTest />}></Route>
        </Routes>
      </Paperbase>

      
    </>
  );
}

export default App;
