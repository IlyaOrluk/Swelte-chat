import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import http from "http";
import io from "socket.io";
import { changeArr } from "./utils/changeArr";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const server = http.createServer();

polka({ server }) // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });

let users = [];
const ioServer = io(server);
ioServer.sockets.on("connection", (socket) => {
  // console.log(users)
  // socket.join(socket.id);
  socket.on("join", (user) => {
    if (!users.find((u) => u.username === user.username)) {
      users = [...users, { ...user, socketId: socket.id }];
      console.log(user.username + ": " + socket.id);
      ioServer.emit("users", users);
    } else {
      const userIndex = users.findIndex((u) => u.username === user.username);
      const newUsers = [
        ...users.slice(0, userIndex),
        {
          ...users[userIndex],
          socketId: socket.id,
        },
        ...users.slice(userIndex + 1, users.length),
      ];
      users = newUsers;
      ioServer.emit("users", newUsers);
    }
  });
  socket.on("leave", (user) => {
    let newUsers = users.filter((u) => u.username !== user.username);
    users = newUsers;
    ioServer.emit("users", newUsers);
  });

  socket.on("getUsers", () => {
    ioServer.emit("users", users);
  });

  socket.on("private message", ({ message, to }) => {
    console.log(message, 'to', to)
    const receiver = users.find((u) => u.username === to);
    ioServer.to(receiver.socketId).emit("private message", {
      ...message,
    });
    // console.log(socket.id + ' - '  + receiver.socketId)
    ioServer.to(socket.id).emit("private message", {
      ...message,
    });
  });

  // socket.on("create", (room) => {
  //   socket.join(room);
  //   console.log("user connect to " + "room_" + room);

  //   socket.on("disconnect", () => {
  //     socket.leave(room);
  //     console.log("user disconnected", "room_" + room);
  //   });

  //   socket.on("chat", (msg) => {
  //     console.log(users);
  //     socket.to(room).emit("chat", msg);
  //   });

  //   socket.on("leave room", () => {
  //     console.log("leave from " + room);
  //     socket.leave(room);
  //   });
  // });
});
