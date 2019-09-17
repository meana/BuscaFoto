var map;
var spain_geographical_center_lat = 40.308611;
var spain_geographical_center_lng = -3.684444;

var markersArray = [];
var circleArray = [];
var poly;

function initMap(listener) {
    var spain_geographical_center = new google.maps.LatLng(spain_geographical_center_lat, spain_geographical_center_lng);
    var mapOptions = {
        center: spain_geographical_center,
        zoom: 6,
        mapTypeId: 'satellite',
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false
    };
    map = new google.maps.Map(document.getElementById("map_frame"), mapOptions);

    var createMarker = map.addListener('click', function(e) {
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        markersArray.push(marker);
        google.maps.event.removeListener(createMarker);
    });
}
