$( document ).ready(function() {

    let selectedPhotoIndex = 0;

    $('#photo').attr('src', photos[selectedPhotoIndex].imgRef);
    $('#photoTitle').text(photos[selectedPhotoIndex].name);
    $('#summary').text(selectedPhotoIndex+1 + '/' + photos.length);
    initializeButtons();

    $('#map_frame').click(function(){
        $('#confirm').prop( "disabled", false );
        $('#cancel').prop( "disabled", false );
    })

    $("#confirm").click(function(){
        showMonumentLocation(selectedPhotoIndex);
        generateScoringZone(selectedPhotoIndex);
        $('#confirm').prop( "disabled", true );
        $('#cancel').prop( "disabled", true );
        $('#next').prop( "disabled", false );
    });

    $("#cancel").click(function(){
        $('#confirm').prop( "disabled", true );
        $('#cancel').prop( "disabled", true );
        $('#next').prop( "disabled", true );
        removeMarker();
        enableMarkerCreation();
    });

    $("#next").click(function(){
        initializeButtons();
        removeMarker();
        removeScoringZone();
        enableMarkerCreation();
        if(selectedPhotoIndex === photos.length-1){
            selectedPhotoIndex = 0;
        } else {
            selectedPhotoIndex+=1;
        }
        $('#photo').attr('src', photos[selectedPhotoIndex].imgRef);
        $('#photoTitle').text(photos[selectedPhotoIndex].name);
        $('#summary').text(selectedPhotoIndex+1 + '/' + photos.length);
    });
});

function initializeButtons(){
    $('#confirm').prop( "disabled", true );
    $('#cancel').prop( "disabled", true );
    $('#next').prop( "disabled", true );
}

function enableMarkerCreation(){
    let createMarker = map.addListener('click', function(e) {
        let marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        google.maps.event.removeListener(createMarker);
    });
}

function removeMarker(){
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }
}

function showMonumentLocation(selectedPhotoIndex){
    let monument = new google.maps.Marker({
        position: new google.maps.LatLng(photos[selectedPhotoIndex].lat, photos[selectedPhotoIndex].lng),
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        map: map
    });
    markersArray.push(monument)
}

function generateScoringZone(selectedPhotoIndex){
    let monument = new google.maps.LatLng(photos[selectedPhotoIndex].lat, photos[selectedPhotoIndex].lng);
    let radio = 25000;
    for(radio; radio <= 200000; radio+=50000){
        console.log(radio)
        var circleOptions = {
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#00FF00',
            fillOpacity: 0.15,
            map: map,
            center: monument,
            radius: radio
        };
        circleArray.push(new google.maps.Circle(circleOptions));
    }
}

function removeScoringZone() {
    if (circleArray) {
        for (i in circleArray) {
            circleArray[i].setMap(null);
        }
        circleArray.length = 0;
    }
}

