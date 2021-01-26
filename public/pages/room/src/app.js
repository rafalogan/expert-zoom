

const recordClick = function (recorderBtn) {
  this.recordingEnabled = false
  return () => {
    this.recordingEnabled = !this.recordingEnabled
    recorderBtn.style.color = this.recordingEnabled ? 'red' : 'white'
  }
}

const onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const socketUrl = 'http://localhost:3000';
  const peerConfig = Object.values({
		id: undefined,
		config: {
			host: 'localhost',
			port: 9000,
			path: '/',
			secure: false,
			debug: true
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
  // const recorderBtn = document.getElementById('record')

  // recorderBtn.addEventListener('click', recordClick(recorderBtn))
  console.log('this is the room', room);

  Business.initialize(deps)


}

window.onload = onload
