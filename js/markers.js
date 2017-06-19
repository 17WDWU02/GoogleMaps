var map, marker, infobox, userLocation, directionDisplay;
var markers = [];
var AllMarkers = [
	{
		lat: -41.292662,
		lng: 174.778967,
		title: "Tommy Millions",
		description: "Tommy Millions Pizza and IceCream"
	},
	{
		lat: -41.2936945,
		lng: 174.7731592,
		title: "Kaffee Eis - Cuba St",
		description: "Kaffee Eis on Cuba St"
	},
	{
		lat: -41.291377,
		lng: 174.7922569,
		title: "Kaffee Eis - Oriental Bay",
		description: "Kaffee Eis on Oriental Bay"		
	},
	{
		lat: -41.293972,
		lng: 174.782270,
		title: "Kaffee Eis - Courtenay Place",
		description: "Kaffee Eis on Courtenay Place"
	},
	{
		lat: -41.287890,
		lng: 174.779022,
		title: "Kaffee Eis - Frank Kitt's Lagoon",
		description: "Kaffee Eis on Frank Kitt's Lagoon"
	}
];

function init(){

	var mapOptions = {
		//Set where the Map starts
		center:{
			lat: -41.258166,
			lng: 174.764943
		},
		//states what the initial zoom for the map is. 
		zoom: 15,
		//Turn off all of the User Interface for the Map
		disableDefaultUI: false,
		//Turn off the ability to zoom with clicks
		disableDoubleClickZoom: false,
		//Turn off the ability to zoom with scroll wheel
		scrollwheel: true,
		//Turn off the ability to drag the map around
		draggable: true,
		draggableCursor: "pointer",
		draggingCursor: "crosshair",
		fullscreenControl: true,
		backgroundColor: "grey",
		keyboardShortcuts: false,
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER
		},
		styles: [
			{
				stylers:[
					{ hue: "#d01439" },
					{ saturation: -20 }
				]
			},
			{
		        featureType: "road",
		        elementType: "geometry",
		        stylers: [
		        	{ hue: "#3498db" },
		        	{ lightness: 0 },
		          	{ visibility: "none" }
		        ]
			},
			{
				featureType: "transit",
				elementType: "labels",
				stylers: [
					{ hue: "#ff0066"},
					{ saturation: +80 }
				]
			},
			{
				featureType: "water",
				stylers: [
					{ color: "#16a085"}
				]
			},
			{
				featureType: "poi",
				stylers: [
					{visibility: "off"}
				]
			}
		]
	}

	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	FindUser();
	// addSingleMaker();
	addAllMarkers();
	// marker.addListener("click", toggleBounce);
	map.addListener("click", addMarker);
	// infoBox();
}

google.maps.event.addDomListener(window, 'load', init);




function addAllMarkers(){
	for (var i = 0; i < AllMarkers.length; i++) {
		marker = new google.maps.Marker({
			position:{
				lat: AllMarkers[i].lat,
				lng: AllMarkers[i].lng
			},
			map: map,
			animation: google.maps.Animation.DROP,
			// icon: "image/icon.png",
			title: AllMarkers[i].title,
			description: AllMarkers[i].description
		})
		markers.push(marker);
		Allinfobox(marker);
	};
}




function addSingleMaker(){
	marker = new google.maps.Marker({
		position:{
			lat: -41.295005,
			lng: 174.78362
		},
		map: map,
		animation: google.maps.Animation.DROP,
		icon: "images/icon.png",
		title : "Yoobee School of Design",
		description: "Description for Yoobee School of Design"
	})
}

function toggleBounce(){
	if(marker.getAnimation() === null){
		marker.setAnimation(google.maps.Animation.BOUNCE);
	} else {
		marker.setAnimation(null);
	}
}

function infoBox(){
	var infobox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click", function(){
		infobox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"+
							"<div>"+marker.description+"</div>"
			);
		infobox.open(map, marker);
	});

}

//The reason we can use the exact same code as above is that we are passing through
// a variable and calling it marker
function Allinfobox(marker){
	if(infobox){
		infobox.close();
	}
	infobox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click", function(){
		infobox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"+
							"<div>"+marker.description+"</div>"
			);
		infobox.open(map, marker);
	});
}

var toggleMarkerOn = true;
function toggleMarkers(){
	for (var i = 0; i < markers.length; i++) {
		if(toggleMarkerOn === true){
			markers[i].setMap(null);
		} else {
			markers[i].setMap(map);
		}
	};
	if(toggleMarkerOn === true){
		toggleMarkerOn = false;
	} else {
		toggleMarkerOn = true;
	}
}

function FindUser(){

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			userLocation = new google.maps.Marker({
				position:{
					lat: position.coords.latitude,
					lng: position.coords.longitude
				},
				map: map,
				animation: google.maps.Animation.DROP,
				icon: "images/icon.png"
			});
			markers.push(userLocation);
			map.panTo(userLocation.position);
		})
	}

}
var clickmarker;
function addMarker(event){
	if(clickmarker){
		clickmarker.setMap(null);
	}
	var location = event.latLng;
	clickmarker = new google.maps.Marker({
		position: location,
		map: map
	});
	markers.push(clickmarker);

	showDirection(location);
}

function showDirection(location){
	if(directionDisplay){
		directionDisplay.setMap(null);
	}

	var directionService = new google.maps.DirectionsService();
	directionDisplay = new google.maps.DirectionsRenderer();

	directionDisplay.setMap(map);

	directionService.route({
		origin: userLocation.position,
		destination: {location},
		travelMode: google.maps.TravelMode.DRIVING,
	}, function(response, status){
		if(status == "OK"){
			directionDisplay.setDirections(response);
		} else if(status == "NOT_FOUND"){

		} else if(status == "ZERO_RESULTS"){

		}
	});
}












