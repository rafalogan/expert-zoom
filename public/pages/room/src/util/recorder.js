class Recorder {
	constructor(userName, stream) {
		this.userName = userName;
		this.stream = stream;

		this.filename = `id:${this.userName}-when:${Date.now()}`;
		this.videoType = `video/webm`

		this.mediaRecorder = {};
		this.recordedBlobs = [];
		this.completeRecordings = [];
		this.recordingActive = false;
	}

	startRecording() {
		const options = this._setup();

		// if aren't receiving video, ignore!
		if (!this.stream.active) return;

		this.mediaRecorder = new MediaRecorder(this.stream, options);
		console.log(`Created MediaRecorder ${this.mediaRecorder} with options ${options}`);

		this.mediaRecorder.onstop = (event) => {
			console.log('Recorded Blobs', this.recordedBlobs);
		}

		this.mediaRecorder.ondataavailable = event => {
			if (!event.data || !event.data.size) return;
			this.recordedBlobs.push(event.data);
		}

		this.mediaRecorder.start();
		console.log(`Media Recorded start`, this.mediaRecorder);
		this.recordingActive = true;
	}

	async stopRecording() {
		if (!this.recordingActive) return;
		if(this.mediaRecorder.state === 'inactive') return;

		console.log('media recorded stopped', this.userName);
		this.mediaRecorder.stop();
		this.recordingActive = false;

		await Util.sleep(200);
		this.completeRecordings.push([...this.recordedBlobs]);
		this.recordedBlobs = [];
	}

	_setup() {
		const commonCodecs = [
			'codecs=vp9,opus',
			'codecs=vp8,opus',
			''
		];

		const options = commonCodecs
			.map(codec => ({mineType: `${this.videoType};${codec}`}))
			.find(options => MediaRecorder.isTypeSupported(options.mineType));

		if (!options) throw new Error(`None of the codecs: ${commonCodecs.join('')} are supported.`);

		return options;
	}
}
