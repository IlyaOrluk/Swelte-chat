import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import http from 'http'
import io from 'socket.io'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = http.createServer();



polka({ server }) // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

io(server).sockets.on('connection', function(socket) {
	socket.on('create', function(room) {
		console.log('create room_'+room)
		socket.join(room);
		socket.in(room).emit('chat message')
		// socket.broadcast.emit('chat message', '{"message" : "User connect!"}');
	});
});
// io(server).on('connection', function(socket){
// 	socket.join('1_room');

// 	socket.to('2_room').emit('chat message');
// 	console.log('a user connected');
// 	socket.broadcast.emit('chat message', '{"message" : "User connect!"}');

// 	socket.to('2_room').on('disconnect', function(){
// 		console.log('user disconnected');
// 		socket.broadcast.emit('chat message', '{"message" : "User disconnect..."}');
// 	});

// 	socket.to('2_room').on('chat message', function(msg){
// 		socket.broadcast.emit('chat message', msg);
// 	});
// });

