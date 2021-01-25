

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
  const room = urlParams.get('room');
  const socketBuilder = new SocketBuilder({socketUrl});
  const view = new View()
	const media = new Media();
  const deps = {view, media, room, socketBuilder};
  // const recorderBtn = document.getElementById('record')

  // recorderBtn.addEventListener('click', recordClick(recorderBtn))
  console.log('this is the room', room);

  Business.initialize(deps)


}

window.onload = onload
