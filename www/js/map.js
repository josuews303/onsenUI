var lat = '';
var lon = '';
var dest = '';
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: -0.1318858, lng: -78.4827243 }
    });
    directionsDisplay.setMap(map);

    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    var myLatlng = { lat: parseFloat(lat.toString()), lng: parseFloat(lon) };
    // Create the initial InfoWindow.
    var infoWindow = new google.maps.InfoWindow(
        { content: 'Click the map to get routes', position: myLatlng });
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener('click', function (mapsMouseEvent) {
        // Close the current InfoWindow.
        infoWindow.close();

        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
        infoWindow.setContent(mapsMouseEvent.latLng.toString());
        dest = mapsMouseEvent.latLng;
        infoWindow.open(map);
        onChangeHandler();
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var org = {lat:parseFloat(lat),lng:parseFloat(lon)};
    console.log('org',org);
    console.log('dest',dest);
    directionsService.route({
        origin: org,
        destination: dest,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
var onSuccess = function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log('pos',position);
    console.log('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
