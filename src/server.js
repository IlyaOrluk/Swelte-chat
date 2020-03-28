import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import http from 'http'
import io from 'socket.io'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const server = http.createServer()



polka({ server }) // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err)
	});

io(server).sockets.on('connection', function(socket) {
	socket.on('create', function(room) {
		socket.join(room)
		console.log('user connect to '+'room_'+room)

		socket.on('disconnect', function(){
			console.log('user disconnected', 'room_'+room)
		})
		
		socket.on('test', (msg) => {
			console.log(room, 'channel test')
			socket.to(room).emit('test', msg)
		})
	})
})

