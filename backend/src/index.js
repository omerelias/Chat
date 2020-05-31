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
  io.emit('room-created', req.body.userName)
  res.end();
})

app.get('/room', (req, res) => {
  res.json(rooms);
})


server.listen(5000, () => {
  console.log('listening on *:5000');
});

io.on('connection', function (socket) {
  socket.on('join-room', (userName, isAgent="No") => {
    socket.join(userName);
    if(isAgent==="Yes"){
      rooms[userName].isTaken=true;
    }
    socket.on('message', function (msg) {
      console.log('sent message');
      socket.broadcast.to(userName).emit('message', msg);
    });
  
    socket.on('disconnect', () => {
      io.in(userName).emit('message', `${isAgent ? 'Agent' : userName} has left the chat!`);

    })
  })
});