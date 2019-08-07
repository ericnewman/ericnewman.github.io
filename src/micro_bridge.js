let  microBridge = {
	version: 'Micro Bridge 1.0' ,


	sendDelayedBanner(url, delay) {

		url = (url  + '?snooze_interval=' + delay);

		let bTime = this.getTime(0,delay);

		//Touch this at your own peril.... This is totally fragile
		//let msg = '{"actionAttempts": 0, "cmds": [{ "jsCmd": {"js": "javascript:(function() { var config = {disabled: false, standaloneUrl: \\\"' + url + '\\\", layoutConfig: {layout_height: \\\"match_parent\\\", layout_width: \\\"match_parent\\\"} }; MP.displayBanner(JSON.stringify(config)); })();"}}],"id": "OptInExecutorId","lastActionTime": 0,"oneShot": true,"allowWhenIdle": true,"disabled": false,"scheduledTimes": ["' + bTime + '"],"type": "ScheduledCommandExecutor"}';
		//let msg = '{"actionAttempts": 0, "cmds": [{ "jsCmd": {"js": "javascript:(function() { var config = {disabled: false, standaloneUrl: \\\"' + url + '\\\", layoutConfig: {layout_height: \\\"match_parent\\\", layout_width: \\\"match_parent\\\"} }; MP.displayBanner(JSON.stringify(config)); })();"}}],"id": "OptInExecutorId","lastActionTime": 0,"oneShot": true,"allowWhenIdle": true,"disabled": false,"scheduledTimes": ["' + bTime + '"],"type": "ScheduledCommandExecutor"}';
		//let msg = '{"actionAttempts": 0, "cmds": [{ "jsCmd": {"js": "javascript:(function() { var config = {disabled: false, standaloneUrl: \\\"' + url + '\\\", layoutConfig: {layout_height: \\\"match_parent\\\", layout_width: \\\"match_parent\\\"} }; MP.displayBanner(JSON.stringify(config)); })();"}}],"id": "OptInExecutorId","lastActionTime": 0,"oneShot": true,"allowWhenIdle": true,"disabled": false,"scheduledTimes": ["' + bTime + '"],"type": "ScheduledCommandExecutor"}';
		//
		let msg = '{"actionAttempts": 0, "cmds": [{ "jsCmd": {"js": "javascript:(function() { var config = {disabled: false, standaloneUrl: \\\"' + url + '\\\", layoutConfig: {layout_height: \\\"match_parent\\\", layout_width: \\\"match_parent\\\"} }; MP.displayBanner(JSON.stringify(config)); })();"}}],"id": "OptInExecutorId","lastActionTime": 0,"oneShot": true,"allowWhenIdle": true,"disabled": false,"scheduledTimes": ["' + bTime + '"],"type": "ScheduledCommandExecutor"}';

		let MP = window.MP || '';

		if (MP && window.MP.addScheduledCommandExecutor) {
			MP.addScheduledCommandExecutor((msg));
			//console.log(msg);
			MP.dismiss();
		}
		else {
			//console.log(msg);
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
	},

	getTime (addHour, addMin) {
		addHour = (addHour ? addHour : 0);
		addMin = (addMin ? addMin : 0);
		let time = new Date(new Date().getTime());
		let AM = true;
		let ndble = 0;
		let hours, newHour, overHour, newMin, overMin;
		//change form 24 to 12 hour clock
		if (time.getHours() >= 13) {
			hours = time.getHours() - 12;
			AM = (hours >= 12);
		}
		else {
			hours = time.getHours();
			AM = (!(hours >= 12));
		}
		//get the current minutes
		let minutes = time.getMinutes();
		// set minute
		if ((minutes + addMin) >= 60 || (minutes + addMin) < 0) {
			overMin = (minutes + addMin) % 60;
			overHour = Math.floor((minutes + addMin - Math.abs(overMin)) / 60);
			if (overMin < 0) {
				overMin = overMin + 60;
				overHour = overHour - Math.floor(overMin / 60);
			}
			newMin = String((overMin < 10 ? '0' : '') + overMin);
			addHour = addHour + overHour;
		}
		else {
			newMin = minutes + addMin;
			newMin = String((newMin < 10 ? '0' : '') + newMin);
		}
		//set hour
		if ((hours + addHour >= 13) || (hours + addHour <= 0)) {
			overHour = (hours + addHour) % 12;
			ndble = Math.floor(Math.abs((hours + addHour) / 12));
			if (overHour <= 0) {
				newHour = overHour + 12;
				if (overHour === 0) {
					ndble++;
				}
			}
			else if (overHour === 0) {
				newHour = 12;
				ndble++;
			}
			else {
				ndble++;
				newHour = overHour;
			}
			newHour = (newHour < 10 ? '0' : '') + String(newHour);
			AM = ((ndble + 1) % 2 === 0) ? AM : !AM;
		}
		else {
			AM = (hours + addHour === 12 ? !AM : AM);
			newHour = String((Number(hours) + addHour < 10 ? '0' : '') + (hours + addHour));
		}
		let am = (AM) ? 'AM' : 'PM';
		//return new Array(newHour, newMin, am);
		return newHour + ':' +  newMin  + ':00 ' +  am;
	}
};

export { microBridge };


