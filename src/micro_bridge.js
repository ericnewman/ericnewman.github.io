let  microBridge = {
	version: 'Micro Bridge 1.0' ,


	sendDelayedBanner(url, delay) {

		let msg = { notification: {
			'alert-sound': false,
			'default-title': 'Start using uRUP',
			'en-message': 'Welcome to uRUP',
			'default-message': 'Welcome to uRUP',
			'en-title': 'Start using uRUP',
			'es-title': 'Comenzar a usar uRUP',
			'alert-vibrate': true,
			'es-message': 'Bienvenido a uRUP'
		},
		content: {
			'default-url': '',
			width: 'match_parent',
			'es-url': '',
			'en-url': '',
			height: 'match_parent' },
		'display-delay-duration': 'PT15M'
		};
		msg.content['default-url'] = url;
		msg.content['es-url'] = url;
		msg.content['en-url'] = url;
		msg['display-delay-duration'] = 'PT' + delay + 'M';

		let MP = window.MP || '';

		if (MP && window.MP.addScheduledCommandExecutor) {
			MP.addScheduledCommandExecutor(msg);
			MP.dismiss();
		}
	},
	closeWindow() {
		let MP = window.MP || '';

		if (MP && window.MP.addScheduledCommandExecutor) {
			MP.dismiss();
		}
		else {
			document.location.href= 'http://google.com';
		}
	},


	versionInfo () {
		return this.version;
	}
};

export { microBridge };


