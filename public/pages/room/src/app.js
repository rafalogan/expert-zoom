const onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  // const socketUrl = 'http://localhost:3000';
  const socketUrl = 'https://jsexpert-socket-server.herokuapp.com/';
  const peerConfig = Object.values({
		id: undefined,
		config: {
			host: 'my-peers-server.herokuapp.com',
			path: '/',
			secure: true,
			// port: 9000,
			// debug: true
		}
	})

  const room = urlParams.get('room');
  const socketBuilder = new SocketBuilder({socketUrl});
  const peerBuilder = new PeerBuilder({peerConfig})
  const view = new View()
	const media = new Media();
  const deps = {
  	view,
		media,
		room,
		socketBuilder,
		peerBuilder
  };
  console.log('this is the room', room);

  Business.initialize(deps)


}

window.onload = onload
