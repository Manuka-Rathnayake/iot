const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5174;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.static('../Client/src/'));

let buttonState = false;

io.on('connection', socket => {
    console.log('New Connection');

    io.to(socket.id).emit('buttonState',buttonState);

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });

    socket.on('connect_error', (error) => {
        console.log('Connection error:', error);
      });

  socket.on('buttonState',value => {
        console.log('buttonState:',value);
        buttonState = value;
        socket.broadcast.emit('buttonState',value);
    });


});

httpServer.listen(PORT, () => {
    console.log('Running on : ', httpServer.address());
});
