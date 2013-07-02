var app = {

    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.addEventListener('online', this.onOnline, false);
        //document.addEventListener('offline', this.onOffline, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');

    },
    onOnline: function () {
        alert('Estás Online!');
    },
    onOffline: function () {
        alert('Estás Offline!');
    },
    tokenHandler: function (msg) {
        //onEnviaMailClick(msg);
        //alert("Sucesso!! Token = " + msg);

        var result = document.getElementById("p_token");
        result.innerText = '';
        result.innerText = msg;
    },
    errorHandler: function (error) {
        console.log("Error Handler  " + error);
        alert(error);
    },
    // result contains any message sent from the plugin call
    successHandler: function (result) {
        //window.localStorage.setItem('token', result);
        //onEnviaMailClick(result);
        //alert('Successo! ID = ' + result)
        var result = document.getElementById("p_token");
        result.innerText = '';
        result.innerText = result;
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var pushNotification = window.plugins.pushNotification;
        // TODO: Enter your own GCM Sender ID in the register call for Android
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(this.successHandler, this.errorHandler, { "senderID": "27394163591", "ecb": "app.onNotificationGCM" });
        }
        else {
            pushNotification.register(this.tokenHandler, this.errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "app.onNotificationAPN" });
        }
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // iOS
    onNotificationAPN: function (event) {
        var pushNotification = window.plugins.pushNotification;
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    // Android
    onNotificationGCM: function (e) {
        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    //alert('registration id = ' + e.regid);
                    //onEnviaMailClick(e.regid);
                    //   enviaMail(e.regid);

                    var result = document.getElementById("p_token");
                    result.innerText = '';
                    result.innerText = e.regid;

                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model
                // of the intermediary push server which must also be reflected in GCMIntentService.java
                alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
                break;

            case 'error':
                alert('GCM error = ' + e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    }

};

function onEnviaMailClick(){
    //var l_token = window.localStorage.getItem('token');
    var result = document.getElementById("p_token");
    window.open('mailto:renato.mendes@futureview.pt?subject=' + result.innerText + ''); //&body=' + l_token + '');
};

