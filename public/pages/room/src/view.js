
class View {
	constructor() {
		this.recorderBtn = document.getElementById('record');
	}


	createVideoElement({muted = true, src, srcObject}) {
		const video = document.createElement('video')
		video.muted = muted;
		video.src = src;
		video.srcObject = srcObject;

		if (src) {
			video.controls = true;
			video.loop = true;
			Util.sleep(200)
				.then(() => video.play());
		}

		if (srcObject) video.addEventListener('loadedmetadata', () => video.play());

		return video
	}

	renderVideo({userId, stream = null, url = null, isCurrentId = false, muted = true}) {
		const video = this.createVideoElement({
			muted,
			src: url,
			srcObject: stream
		});

		this.appendToHTMLTree(userId, video, isCurrentId);
	}

	appendToHTMLTree(userId, video, isCurrentId) {
		const div = document.createElement('div');
		const div2  = document.createElement('div');
		const videoGrid = document.getElementById('video-grid');

		div.id = userId;
		div.classList.add('wrapper');
		div.append(video);

		div2.innerText = (isCurrentId) ? '' : userId;
		div.append(div2);

		videoGrid.append(div);

	}

	setParticipants(count) {
		const myself = 1;
		const participants = document.getElementById('participants');

		participants.innerHTML = (count + myself);
	}

	removeVideoElement(id) {
		return document.getElementById(id).remove();
	}


	toggleRecordingButtonColor(isActive = true) {
		this.recorderBtn.style.color = (isActive) ? 'red' : 'white'
	}

	onRecordClick(command) {
		this.recordingEnabled = false
		return () => {
			const isActive = this.recordingEnabled = !this.recordingEnabled

			command(this.recordingEnabled);
	 		this.toggleRecordingButtonColor(isActive);
		}
	}

	configureRecordButton(command) {
		this.recorderBtn.addEventListener('click', this.onRecordClick(command))
	}
}
