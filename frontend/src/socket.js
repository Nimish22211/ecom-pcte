import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
  autoConnect: false,
  // Called fresh on every (re)connect attempt, so it always picks up
  // the current token — including after a fresh login.
  auth: (cb) => cb({ token: localStorage.getItem('token') }),
});

export default socket;
