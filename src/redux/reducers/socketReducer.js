import socketIOClient from "socket.io-client";

const Socket = socketIOClient("http://localhost:5000");

export default function(state = Socket, action) {
  switch (action.type) {
    default:
      return state;
  }
}
