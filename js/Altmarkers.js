var map;

function init(){

	var mapOptions = {
		//Set where the Map starts
		center:{
			lat: -41.2950049,
			lng:174.7814311
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
	showAllMarkers();
}

google.maps.event.addDomListener(window, 'load', init);


function showAllMarkers(){
	$.ajax({
		url: "js/markers.json",
		dataType: 'json',
		success: function(DataFromJSON){
			for (var i = 0; i < DataFromJSON.markers.length; i++) {
				var marker = new google.maps.Marker({
					position: {
						lat: DataFromJSON.markers[i].lat,
						lng: DataFromJSON.markers[i].lng
					},
					map: map
				})
			};
		},	
		error: function(){
			console.log("something went wrong");
		}
	})
}









