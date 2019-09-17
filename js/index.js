let score = 0;

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
        //todo Join in the same function due to syc issues.
        showMonumentLocation(selectedPhotoIndex);
        generateScoringZone(selectedPhotoIndex);
        createLine(markersArray[0].position, markersArray[1].position)
        score += calculateScore(markersArray[0], markersArray[1]);
        showSummary(markersArray[0], markersArray[1]);
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
        removeLine();
        enableMarkerCreation();
        initializeSummary();
        if(selectedPhotoIndex === photos.length-1){
            initializeButtons();
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
        markersArray.push(marker);
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
    let radio = 200000;
    let colorIndex = 0;
    let opacity = 0.15;
    let colors = ['#FF0000','#FF7F00','#FFFF00','#00FF00'];

    for(radio; radio >= 25000; radio-=50000){
        var circleOptions = {
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: colors[colorIndex],
            fillOpacity: opacity,
            map: map,
            center: monument,
            radius: radio
        };
        colorIndex++;
        opacity+=0.05;
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

function calculateScore(marker, monument){
    let distance = google.maps.geometry.spherical.computeDistanceBetween(marker.position, monument.position);

    if(distance <= 25000){
        return 100;
    } else if(distance > 25000 && distance <=75000){
        return 75;
    } else if (distance > 75000 && distance <=125000){
        return 50;
    } else if (distance > 125000 && distance <=175000){
        return 25;
    } else {
        return 0;
    }
}

function createLine(marker, monument) {
    var polyOptions = {
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    };

    poly = new google.maps.Polyline(polyOptions);
    poly.setMap(map);

    let path = poly.getPath();
    path.push(marker);
    path.push(monument);
}

function removeLine(){
    poly.setMap(null);
}

function initializeSummary(){
    $('#distance').text("Distancia: ");
    $('#score').text("Puntuación obtenida: ");
}

function showSummary(marker, monument){
    let distance = google.maps.geometry.spherical.computeDistanceBetween(marker.position, monument.position);

    $('#distance').text("Distancia: " + Math.round(distance)/1000 + " Km");
    $('#score').text("Puntuación obtenida: " + calculateScore(marker, monument));
    $('#globalScore').text("Puntuación Global: " + score);
}

