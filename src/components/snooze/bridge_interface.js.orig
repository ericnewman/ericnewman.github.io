/*
A Collection of Javascript commands to wrap or emulate existing MP Namespace commands that are provided by our family of Applications
*/
var MobilePosse = {};

(function () {
  'use strict';

  var geoOptions = {
      enableHighAccuracy: false,
      maximumAge: 5 * 60 * 1000,
      timeout: 10 * 1000
  };
  var refreshInterval = 10800000; // 3hours
  var mp_location_statesNames = {'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA', 'Colorado': 'CO',
    'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL',
    'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT',
    'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
    'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA',
    'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
    'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
    'American Samoa': 'AS', 'District of Columbia': 'DC', 'Federated States of Micronesia': 'FM', 'Guam': 'GU',
    'Marshall Islands': 'MH', 'Northern Mariana Islands': 'MP', 'Palau': 'PW', 'Puerto Rico': 'PR', 'Virgin Islands': 'VI'};

  window.addEventListener("load", function(event) {
  // window.onload = function () {
    if (timeToRefresh()) { // See if last refresh is over three hours ago...
      MobilePosse.updateAllData(false);
    }
    if (window.MP && (window.MP.setScreenUnLockCallBack != undefined)) {
      MP.setScreenUnLockCallBack('MobilePosse.mpUnlockScreenCallBack()');
      console.log('Set Unlock Command');
    } else {
      console.log('No Bridge, so not registering Unlock event');
    }
  });

  MobilePosse.fireUnlockEventToGTM = function () {
    var dataObject = {
      event: 'activate',
      time: Date.now()
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(dataObject);
  };

  function success(location) {
    localStorage.setItem('mp_loc_lat', location.coords.latitude);
    localStorage.setItem('mp_loc_lng', location.coords.longitude);
    localStorage.setItem('mp_addr_mLatitude', location.coords.latitude);
    localStorage.setItem('mp_addr_mLongitude', location.coords.longitude);
    localStorage.setItem('mp_addr_mHasLatitude', true);
    localStorage.setItem('mp_addr_mHasLongitude', true);

    localStorage.setItem('mp_loc_prvdr', 'browser');
    localStorage.setItem('mp_loc_date', new Date());
    localStorage.setItem('mp_loc_fromLast', true);
  }

  function posError() {
    console.log('Unable to get GPS Position, Using Arlington as a test for now');
    var lat = '38.8833025';
    var lng = '-77.1165271';
    localStorage.setItem('mp_loc_lat', lat);
    localStorage.setItem('mp_loc_lng', lng);
    localStorage.setItem('mp_lat', lat);
    localStorage.setItem('mp_lng', lng);
    localStorage.setItem('mp_addr_mLatitude', lat);
    localStorage.setItem('mp_addr_mLongitude', lng);
    localStorage.setItem('mp_addr_mHasLatitude', true);
    localStorage.setItem('mp_addr_mHasLongitude', true);
    localStorage.setItem('mp_loc_acc', '0');
    localStorage.setItem('mp_loc_brng', '0');
    localStorage.setItem('mp_loc_date', new Date());
    localStorage.setItem('mp_loc_fromLast', false);
    localStorage.setItem('mp_loc_prvdr', 'none');
    localStorage.setItem('mp_locSource', 'none');
    localStorage.setItem('mp_addr_mLocality', 'Arlington');
    localStorage.setItem('mp_addr_mAdminArea', 'Virginia');
    localStorage.setItem('mp_addr_AddressLines0', '1 Your Street, Arlington, VA, 22102');
    localStorage.setItem('mp_addr_Address_ST', 'VA');

  }

  function timeToRefresh() {
    var timeStamp = localStorage.getItem('updateTime');
    var date1;
    if (timeStamp) {
      date1 = new Date(timeStamp);
    }
    else {
      date1 = new Date('Tue Jan 23 2018 16:54:24 GMT-0500 (EST)');
    }
    date1 = new Date(timeStamp);
    var date2 = new Date();

    var diff = date2.getTime() - date1.getTime();
    return diff > refreshInterval;
  }

  // Update LocalStorage with latest Network Information
  //
  MobilePosse.getActiveNetworkInfo = function () {
    var info,data;
    if (window.MP && window.MP.getActiveNetworkInfo !== undefined) {
      info = MP.getActiveNetworkInfo();
      data = JSON.parse(info);
    } else {
      data = {
        "mDetailedState":"unknown",
        "mExtraInfo":"unknown",
        "mIsAvailable":"n/a",
        "mIsFailover":"n/a",
        "mIsMetered":"n/a",
        "mIsRoaming":"n/a",
        "mNetworkType":"n/a",
        "mState":"n/a",
        "mSubtype":"n/a",
        "mSubtypeName":"n/a",
        "mTypeName":"n/a"
      }
    }
    Object.keys(data).forEach(function (key) {
        localStorage.setItem('mp_' + key, data[key]);
    });
  }


  MobilePosse.updateAllData = function (force) {
    if (force) {
      localStorage.setItem('updateTime', 0); // Will essentiall force the refresh to be immediate.
    }

    MobilePosse.getActiveNetworkInfo(); // Update Connection Info, if possible

    if (window.MP && window.MP.getAllAdData !== undefined) {
      var data = window.MP.getAllAdData();
      if (data !== '') {
        data = JSON.parse(data);
      }
      else {
        console.log("Bridge Returned no data");
        return;
      }
      Object.keys(data).forEach(function (key) {
        localStorage.setItem('mp_' + key, data[key]);
      });
      data = JSON.parse(window.MP.getFusedLocation(true));
      Object.keys(data).forEach(function (key) {
        if (key !== 'addr') {
          localStorage.setItem('mp_loc_' + key, data[key]);
        }
      });
      if(data && (data['addr'] !== undefined)) {
          Object.keys(data['addr']).forEach(function (key) {
            localStorage.setItem('mp_addr_' + key, data['addr'][key]);
          });
          Object.keys(data['addr']).forEach(function (key) {
            if (key === 'mAddressLines') {
              localStorage.setItem('mp_addr_AddressLines0', data.addr.mAddressLines[0]);
            }
            else {
              localStorage.setItem('mp_addr_' + key, data['addr'][key]);
            }
          });
        } else {
          posError(); // Device has no location permission in the app.
        };
    }
    else {
      var now = new Date();
      localStorage.setItem('updateTime', now);
      MobilePosse.getDeviceID();
      MobilePosse.getAdvertisingID();
      MobilePosse.getCarrierID();
      MobilePosse.getApplicationVersionName();
      MobilePosse.getApplicationVersionCode();
      MobilePosse.getApplicationBuildRevision();
      localStorage.setItem('mp_addr_mLocale', navigator.language.replace('-', '_'));
      localStorage.setItem('mp_appBundle', navigator.appCodeName);
      localStorage.setItem('mp_appDomain', navigator.appName);
      localStorage.setItem('mp_language', navigator.language.split('-')[0]);
      localStorage.setItem('mp_mpAppVersion', navigator.appVersion.split(' ')[0]);
      var re = new RegExp('/.* ');
      var vers = re.exec(navigator.appVersion)[0].split(' ')[0].replace('/', '');
      localStorage.setItem('mp_appVersionCode', vers);
      navigator.geolocation.getCurrentPosition(success, posError, geoOptions);
      localStorage.setItem('mp_loc_date', now);
      localStorage.setItem('mp_dnt', navigator.doNotTrack);
      localStorage.setItem('mp_ifadtrk', !navigator.doNotTrack);
      var st = localStorage.getItem('mp_addr_mAdminArea') || 'Virginia';
      localStorage.setItem('mp_addr_Address_ST', mp_location_statesNames[st]);

    }
  };

  // Client may not have openCustomTab() (before Client .52)
  MobilePosse.openCustomTab = function (link) {
    if (window.MP && window.MP.openCustomTab !== undefined) {
      window.MP.openCustomTab(link);
    }
    // The next best thing for older clients is to open in Native Browser
    else if (window.MP && window.MP.openNativeBrowser !== undefined) {
      window.MP.openNativeBrowser(link);
    }
    else {
    // Not on client, open in Webview instead
      window.location.href = link;
    }
  };

  MobilePosse.getDeviceID = function () {
    var guid = localStorage.getItem('mp_uuID') || undefined;
    if (guid !== undefined) {
      return guid;
    }
    else if (window.MP && window.MP.getDeviceID !== undefined) {
      guid = window.MP.getDeviceID();
    }
    else {
      guid = generateUUID();
      localStorage.setItem('mp_uuID', guid);
      localStorage.setItem('mp_androidAID', guid);
      localStorage.setItem('mp_androidID', guid);
      return guid;
    }
  };

  // https://developer.android.com/training/articles/user-data-ids.html

  MobilePosse.getAdvertisingID = function () {
    var guid = localStorage.getItem('mp_androidAID') || undefined;
    var dnt = localStorage.getItem('mp_dnt') || navigator.doNotTrack;
    if (guid !== undefined) {
      return guid;
    }
    else if (!dnt && window.MP && window.MP.getAdvertisingID !== undefined) {
      guid = window.MP.getAdvertisingID();
    }
    else {
      guid = generateUUID();
      localStorage.setItem('mp_androidAID', guid);
      localStorage.setItem('mp_dnt', dnt); // We'll set it to false in case it wasn't set already
      localStorage.setItem('mp_ifadtrk', !dnt); // We'll set it to false in case it wasn't set already
      return guid;
    }

  };

  MobilePosse.getApplicationVersionName = function () {
    var vers = localStorage.getItem('mp_AppVersion') || undefined;
    if (vers != undefined) {
      return vers;
    }
    else if (window.MP && window.MP.getApplicationVersionName !== undefined) {
      vers = window.MP.getApplicationVersionName() || vers;
    } else {
      vers = 'No Version Available';
    }
    localStorage.setItem('mp_AppVersion', vers);
    return vers;
  };

  //   " \nDevice ID: " + MobilePosse.getDeviceID() +


  MobilePosse.getApplicationVersionCode = function () {
    var vers = localStorage.getItem('mp_appVer') || undefined;
    if (vers != undefined) {
      return vers;
    }
    else if (window.MP && window.MP.getApplicationVersionCode !== undefined) {
      vers = window.MP.getApplicationVersionCode() || vers;
    } else {
      vers = 'No App Version Code Available';
    }
    localStorage.setItem('mp_appVer', vers);
    return vers;
  };

  // Compare software versions
  // Return 1 if a > b
  // Return -1 if a < b
  // Return 0 if a == b
  MobilePosse.compareApplicationVersionCode = function (a, b) {
    if (a === b) {
       return 0;
    }

    var a_components = a.split(".");
    var b_components = b.split(".");

    var len = Math.min(a_components.length, b_components.length);
    // loop while the components are equal
    for (var i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_components[i]) > parseInt(b_components[i])) {
            return 1;
        }
        // B bigger than A
        if (parseInt(a_components[i]) < parseInt(b_components[i])) {
            return -1;
        }
    }
    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
        return 1;
    }

    if (a_components.length < b_components.length) {
        return -1;
    }
    // Otherwise they are the same.
    return 0;
  }

  MobilePosse.getApplicationBuildRevision = function () {
    var vers = localStorage.getItem('mp_BuildRevisionersion') || undefined;
    if (vers != undefined) {
      return vers;
    }
    else if (window.MP && window.MP.getApplicationBuildRevision !== undefined) {
      vers = window.MP.getApplicationBuildRevision() || vers;
    } else {
      vers = 'No Build Revision Available';
    }
    localStorage.setItem('mp_AppVersion', vers);
    return vers;
  };

  MobilePosse.getCarrierID = function () {
    var vers = localStorage.getItem('mp_carrier') || undefined;
    if (vers != undefined) {
      return vers;
    }
    else if (window.MP && window.MP.getCarrierID !== undefined) {
      vers = window.MP.getCarrierID() || vers;
    } else {
      vers = 'No Carrier Available';
    }
    localStorage.setItem('mp_carrier', vers);
    return vers;
  };

  // three dot menu and share

  MobilePosse.showMenu = function(e) {
      MobilePosse.hideAllMenus();
      jQuery(e.currentTarget).parents('.actions').addClass('open');
      jQuery('body').append('<div class="actions-overlay"></div>')
  }

  MobilePosse.hideAllMenus = function() {
      jQuery('.actions').removeClass('open')
      jQuery('.actions-overlay').remove();
  }

  MobilePosse.fullyDecodeURI = function(uri){
  while (uri !== decodeURIComponent(uri)){
    uri = decodeURIComponent(uri);
  }
  return uri;
  }

  MobilePosse.fullyEncodeURI = function (uri) {
    return encodeURIComponent(uri);
  }

  MobilePosse.stripQuerystring = function(encodedUrl){

      // some img URLs have the &, but no ? so we check for both
      var qsStart = encodedUrl.indexOf('%3F'); // ?
      var qsParam = encodedUrl.indexOf('%26'); // &
      var imgNameDot = encodedUrl.lastIndexOf('.'); // image.jpg  <-  that dot
      // if no matches, get out
      if(qsStart === -1 && qsParam === -1) {
          return encodedUrl;
      }

      // add indexes and get the lowest number from it
      var indexes = [];
      [qsStart, qsParam].forEach(function(num){
          // if no match or part of an image name
          if(num > -1 && num > imgNameDot){
              indexes.push(num)
          }
      })

      //console.log("indexes: %o", indexes)
      var cutoff = Math.min.apply(null, indexes);

      return encodedUrl.substring(0, cutoff);
  }

  // find and return the last url in the string
  MobilePosse.getLastUrl = function (url) {
    // trying to avoid matching on 'http' in a url path so matching on
    // last '://' and check for an 's' just before the matched index
    var decodedUrl = MobilePosse.fullyDecodeURI(url);
    var protocolIndex = decodedUrl.lastIndexOf('://');
    var characterBeforeColon = decodedUrl[protocolIndex -1];

    var originalUrl = "http"+ decodedUrl.substr(protocolIndex);
    if(characterBeforeColon === "s"){
      originalUrl = "https"+ decodedUrl.substr(protocolIndex);
    }
      originalUrl = MobilePosse.fullyEncodeURI(originalUrl);
    return originalUrl;
  }

  // find the last url in the string then remove any querystring
  // data and return an encoded URL
  MobilePosse.getLastUrlStripQs = function (url) {
      return MobilePosse.stripQuerystring( MobilePosse.getLastUrl(url) );
  }

  // ------------------------------------

  MobilePosse.mpUnlockScreenCallBack = function () {
    console.log('Got Original Unlock Command');
    return MobilePosse.fireUnlockEventToGTM();
  };

  // -------------------------------------------------------

  var generateUUID = function () { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== undefined && typeof performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  };

  MobilePosse.getBrand = function(){
      // get the first word of body[data-brand] in lowercase
      var brand = jQuery('body').data('brand').split(' ')[0].toLowerCase();

      // TODO: Find better way to learn brand.
      if(brand === "the") {  // <--- RANK HACKERY!!!!!
        brand = "cricket";
      }

      // TODO: Let's decide a real default... but for now...
      if(brand === '' || brand === undefined) {
        brand = 'cricket';
      }

      return brand;
  }

  MobilePosse.hideBrokenImage = function (img) {
    jQuery(img).parent('a').addClass('image-error')
  }
}());
