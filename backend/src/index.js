const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const controllers = require('./api')
const cors = require('cors')
const {
  urlencoded,
  json
} = require('body-parser')

const rooms = { };

io.on('connection', (socket) => {
  // socket.e('con', 'hello there dear user');

});

app.use(
  cors(),
  urlencoded({
    extended: true
  }),
  json()
);

app.post('/room', (req, res) => {
  rooms[req.body.userName] = { isTaken: false };
  io.emit('room-created', req.body.userName);
  res.end();
})

app.get('/room', (req, res) => {
  res.json(rooms);
})


server.listen(5000, () => {
  console.log('listening on *:5000');
});

io.on('connection', function (socket) {
  socket.on('join-room', ({userName, isAgent}) => {
    socket.join(userName);
    rooms[userName].isTaken=isAgent;
    
    socket.on('message', function (msg) {
      socket.broadcast.to(userName).emit('message', msg);
    });
  
    socket.on('leave-room', (roomName) => {
      socket.broadcast.to(userName).emit('message', `${isAgent ? 'Agent' : userName} has left the chat!`);
      socket.removeAllListeners('message');
      const socketRooms = Object.keys(io.sockets.adapter.sids[socket.id]);
      const socketRoomsWithoutId = socketRooms.filter(roomName => roomName !== socket.id);
      
      socketRoomsWithoutId.forEach(roomName => socket.leave(roomName));
    })
  })
});