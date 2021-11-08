import io from 'socket.io-client';
// const sockets = io('http://localhost:3001', { autoConnect: true, forceNew: true });
const sockets = io(`${process.env.REACT_APP_SOCKET_IO_PATH}`);
export default sockets;