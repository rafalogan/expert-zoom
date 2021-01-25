const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(((request, response) => {
	response.writeHead(204, {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
	});
	response.end('Hey there!');
}))

const io = socketIo(server, {
	cors: {
		origin: '*',
		credentials: false
	}
});

io.on('connection', socket => {
	console.log('connection ->', socket.id);

	socket.on('join-room', (roomId, userId) => {
		// add all users in the some room
		socket.join(roomId);
		socket.to(roomId).broadcast.emit('user-connected', userId);
		socket.on('disconnect', () => {
			console.log('disconnect ->', roomId, userId);
			socket.to(roomId).broadcast.emit('user-disconnected', userId);
		});
	})
})

const startSever = () => {
	const {address, port} = server.address();
	console.log(`app running at ${address}:${port} or http://localhost:${port}`);
};

server.listen(process.env.PORT || 3000, startSever);

