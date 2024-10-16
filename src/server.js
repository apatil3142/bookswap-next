
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const io = new Server(8900, {
  cors: {
    origin: process.env.NEXT_PUBLIC_API_URL,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if(!users.some((user) => user.userId === userId)) users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  // Handle socket events here
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if(user){
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
