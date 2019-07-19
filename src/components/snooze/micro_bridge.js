let  MobilePosse = {
	state: { version: 'Micro Bridge 1.0' },


	updateScheduleList () {
		let str = 'No Bridge';
		//         if(window.MP && window.MP.getAllScheduledLocalNotifications) {
		//             var items = MP.getAllScheduledLocalNotifications();
		let MP = window.MP || '';

		if (MP && window.MP.getAllScheduledBannerExecutors) {
			let items = MP.getAllScheduledBannerExecutors();
			items = JSON.parse(items);

			str = '<table><tr><th>ID</th><th>URL</th><th>TIME</th><th>DIS</th></tr>';
			for (let z = 0; z < items.length; z++) {
				let o = items[z];

				str += '<tr><td>' + o.id + '</td><td>' + o.url + '</td><td>' + o.scheduledTimes + '</td><td>' + o.disabled + '</td></tr>';
			}
			str += '</table>';

		}
		else {
			return (str);
		}
	},

	addScheduledContent (id, url, scheduledTime, enable){

		let mtime = new Date(scheduledTime);
		let otime = mtime.getHours() + ':' + mtime.getMinutes() + ':' + mtime.getSeconds();

		if (window.MP && window.MP.addScheduledLocalNotification) {
			window.MP.addScheduledLocalNotification(id, url, otime, enable);
		}

		this.updateScheduleList();
	},
	versionInfo () {
		return this.state.version;
	}

};
//
//
//
//
//
//
//      function deleteScheduledLocalNotification(name) {
//         if(window.MP && window.MP.deleteScheduledLocalNotification) {
//             window.MP.deleteScheduledLocalNotification(name);
//         }
//         //updateScheduleList();
//     }
//      function toggleNotification(aname) {
//         if(window.MP) {
//             var item = MP.getScheduledLocalNotification(aname);
//             item = JSON.parse(item);
//             // Function inherently toggles value of disabled
//             window.MP.enableScheduledLocalNotification(aname, item.disabled);
//             //updateScheduleList();
//         }
//     }
// }
export default MobilePosse;
