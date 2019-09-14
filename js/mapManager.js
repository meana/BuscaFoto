var map;
var spain_geographical_center_lat = 40.308611;
var spain_geographical_center_lng = -3.684444;

var myMap =
    [
        {
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ];

var markersArray = [];
var circleArray = [];

function initMap(listener) {
    var spain_geographical_center = new google.maps.LatLng(spain_geographical_center_lat, spain_geographical_center_lng);
    var mapOptions = {
        center: spain_geographical_center,
        zoom: 6,
        mapTypeId: 'myMap',
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false
    };
    map = new google.maps.Map(document.getElementById("map_frame"), mapOptions);
    map.mapTypes.set('myMap', new google.maps.StyledMapType(myMap, { name: 'My Map' }));

    var createMarker = map.addListener('click', function(e) {
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        markersArray.push(marker);
        google.maps.event.removeListener(createMarker);
    });
}
