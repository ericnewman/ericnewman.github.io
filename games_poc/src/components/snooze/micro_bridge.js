    var  MobilePosse = {
        state: {version: "Micro Bridge 1.0"},

   updateScheduleList: function () {
         var str = "No Bridge";
//         if(window.MP && window.MP.getAllScheduledLocalNotifications) {
//             var items = MP.getAllScheduledLocalNotifications();
//         if(window.MP && window.MP.getAllScheduledBannerExecutors) {
//             var items = MP.getAllScheduledBannerExecutors();
//             items = JSON.parse(items);
//
//             str = "<table><tr><th>ID</th><th>URL</th><th>TIME</th><th>DIS</th></tr>";
//             for(var z = 0; z < items.length; z++) {
//                 var o = items[z];
//
//                 str += "<tr><td>" + o.id + "</td><td>" + o.url + "</td><td>" + o.scheduledTimes + "</td><td>" + o.disabled + "</td></tr>";
//             }
//              str += "</table>";
//
//         } else {
//             return(str);
//         }
    },

     addScheduledContent: function (id, url, scheduledTime, enable){

        var mtime = new Date(scheduledTime);
        var otime = mtime.getHours() + ":" + mtime.getMinutes() + ":" + mtime.getSeconds();

        if(window.MP && window.MP.addScheduledLocalNotification) {
            window.MP.addScheduledLocalNotification(id, url, otime, enable);
        }

        updateScheduleList();
    },
      versionInfo:function () {
        return this.state.version;
    }

}
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
