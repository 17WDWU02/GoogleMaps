//Declare all of our Global variables for the project
var map, marker, infobox, userLocation, directionDisplay, closestMarker, markers = [], currentMarker, TransportMode = "DRIVING";
//Here are our initial 5 markers which we want to show on the screen
//The only thing which our markers definitly need is a lat and a lng
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

//In this function is where we call everything we want to run when the map loads on the screen
function init(){

	//All of the options for the map
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
		//sets the cursor for when we are able to drag
		draggableCursor: "pointer",
		//sets the cursor for when we are dragging
		draggingCursor: "crosshair",
		//turn on the ability to make the map full screen
		fullscreenControl: true,
		//set the background colour of the map
		backgroundColor: "grey",
		//turns off the ability to use keyboard
		keyboardShortcuts: false,
		//sets where on the map we want the UI element to be
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER
		},
		//This is the section where we can completly style the map
		//Have a look at the Google Maps API Reference to see everything you can do
		styles: [
			{
				//This is setting the overall style to the whole map
				stylers:[
					{ hue: "#d01439" },
					{ saturation: -20 }
				]
			},
			{
				//Just changing all the roads
		        featureType: "road",
		        elementType: "geometry",
		        stylers: [
		        	{ hue: "#3498db" },
		        	{ lightness: 0 },
		          	{ visibility: "none" }
		        ]
			},
			{
				//Changing all the labels for transits
				featureType: "transit",
				elementType: "labels",
				stylers: [
					{ hue: "#ff0066"},
					{ saturation: +80 }
				]
			},
			{
				//Changing the water colour
				featureType: "water",
				stylers: [
					{ color: "#16a085"}
				]
			},
			{
				//Turning off all of the points of intereset
				featureType: "poi",
				stylers: [
					{visibility: "off"}
				]
			}
		]
	}
	//Telling the map where you want to render it
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	// // This function is for Geoloaction and figures out where the current user is
	FindUser();
	// // This function is adding 1 marker on the page where you specify it to go
	// addSingleMaker();
	// // This function is adding all of our markers onto the page
	addAllMarkers();
	// // This function is toggleing the bounce animation on a marker we place
	// marker.addListener("click", toggleBounce);
	// // This function is for adding a new marker on to the map when we click
	map.addListener("click", addMarker);
	// // This function is for adding the infoboxes to the screen
	infoBox();
}

//Calls when the window has loaded the run the init function which will show the map
google.maps.event.addDomListener(window, 'load', init);



//Placing all the markers on the map
function addAllMarkers(){
	//Loop over every marker in our array
	for (var i = 0; i < AllMarkers.length; i++) {
		//Create a new instance of google maps Marker
		marker = new google.maps.Marker({
			position:{
				lat: AllMarkers[i].lat,
				lng: AllMarkers[i].lng
			},
			map: map,
			animation: google.maps.Animation.DROP,
			title: AllMarkers[i].title,
			description: AllMarkers[i].description
		})
		//We are creating an array for all the markers that are actually on the screen
		//Push each of those into that array
		markers.push(marker);
		//Link an infobox to this specific marker
		//This used to be AllInfoBox but since we are now adding more than one event when we click I have changed it to be named for all events
		MarkerClickEvent(marker);
	};
}
//Adding only 1 marker onto the page
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
//Toggle on and of the bounce function
function toggleBounce(){
	//Check to see if there is already an animation linked onto that marker
	//If there isnt then add Bounce and if there is then remove Bounce
	if(marker.getAnimation() === null){
		marker.setAnimation(google.maps.Animation.BOUNCE);
	} else {
		marker.setAnimation(null);
	}
}

//Calls the info Windows
function infoBox(){
	//Create a new instance of google maps infowindows
	var infobox = new google.maps.InfoWindow();
	//Add a click event to the marker
	google.maps.event.addListener(marker, "click", function(){
		//setContent is just like innerHTML. You can actually write html into this document
		infobox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"+
							"<div>"+marker.description+"</div>"
			);
		//Open the infobox
		infobox.open(map, marker);
	});

}

//The reason we can use the exact same code as above is that we are passing through
// a variable and calling it marker
//This is for all the markers to have infowindows.
//We also check to see if one is already open and if it is then we close it before creating a new one

//This used to be called AllInfoBox but now more than just the info box happens
function MarkerClickEvent(marker){
	//if the infobox is already open then close it
	if(infobox){
		infobox.close();
	}
	//create new instance of infowindow from google
	infobox = new google.maps.InfoWindow();
	//Add a click event to the marker which you are currently clicking on
	google.maps.event.addListener(marker, "click", function(){
		//Set the content of the infobox
		infobox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"+
							"<div>"+marker.description+"</div>"
			);
		//open the infobox on the map at the position of the marker.
		//What .open needs is what map you want it on and also what marker you want it on
		infobox.open(map, marker);
		//Change the current marker to the one which you are clicking on
		currentMarker = marker;
		//Show directions to the new marker you hav clicked on using the transport mode which is currently selected
		showDirection(currentMarker.position, TransportMode);
	});
}

//Turning all of the markers on or off
//In the HTML there is a button which has a click event for this function 
var toggleMarkerOn = true;
function toggleMarkers(){
	//Loop over all of the markers in the markers (the ones on the screen) array
	for (var i = 0; i < markers.length; i++) {
		//if the global variable is on then turn them all off
		//and if not turn then all on
		if(toggleMarkerOn === true){
			markers[i].setMap(null);
		} else {
			markers[i].setMap(map);
		}
	};
	//Change the global varaible value for the next time the button is clicked
	if(toggleMarkerOn === true){
		toggleMarkerOn = false;
	} else {
		toggleMarkerOn = true;
	}
}

//Find the current location for the user
function FindUser(){
	//navigator is an object in the browser which holds information
	//what we are looking for is geolocation. Not all devices have geolocation so you only want this to work if it does have it
	if(navigator.geolocation){
		//Get the current position of the user
		navigator.geolocation.getCurrentPosition(function(position){
			//Create a new marker on the map at their current position and save that map to the userLocation variable
			userLocation = new google.maps.Marker({
				position:{
					lat: position.coords.latitude,
					lng: position.coords.longitude
				},
				map: map,
				animation: google.maps.Animation.DROP,
				icon: "images/icon.png"
			});

			//Move the map to focus on the current location of the user
			map.panTo(userLocation.position);
			//Find the closest marker to the user
			FindClosestMarker();
			//Show the directions to that marker that the user can walk to
			showDirection(closestMarker.position, TransportMode);
		})
	} else{

	}

}
//Adding a new marker on the page where you click
var clickmarker;
function addMarker(event){
	//If there is already a clicked marker on the page then remove it
	if(clickmarker){
		clickmarker.setMap(null);
		//remove the last item in the markers array which should be the clicked marker
		markers.pop();
	}
	//get the current location of where you are clicking
	var location = event.latLng;
	//Add a new marker to that location
	clickmarker = new google.maps.Marker({
		position: location,
		map: map
	});
	//add the new marker into the markers array
	markers.push(clickmarker);
	//show the direction to this marker that the user can drive to
	showDirection(location, TransportMode);
}

//Create a direction line to where the user needs to go from their current location
//what it needs is the end location (location) and what travel mode (mode)
function showDirection(location, mode){
	//If there is already a direction line on the map then remove it
	if(directionDisplay){
		directionDisplay.setMap(null);
	}
	//Create a new instance of DirectionsService
	var directionService = new google.maps.DirectionsService();
	//Create a new instance of DirectionRendere
	//This draws the lines on the map
	//This was also initialised at the top of the page
	directionDisplay = new google.maps.DirectionsRenderer();

	//set what map you want it to show on
	directionDisplay.setMap(map);

	//The DirectionService only needs origin, destination and travelMode, but there are several other options you can add
	directionService.route({
		//What is the starting place (lat/lng)
		origin: userLocation.position,
		//What is the end place (lat/lng)
		destination: {location},
		//How is the user getting there
		travelMode: google.maps.TravelMode[mode],
	}, function(response, status){
		//When it comes back from the server you will get a response and a status
		//you should write a case for all of the different status
		//Have a look at the Google Maps API for all of them

		//If everything is all good
		if(status == "OK"){
			//Show the directions on the map
			directionDisplay.setDirections(response);
		} else if(status == "NOT_FOUND"){
			//If one of the start or end locations werent found

		} else if(status == "ZERO_RESULTS"){
			//If there is no results of how to get to the locations
		}
	});
}

//Find the closest marker
function FindClosestMarker(){
	//Create a variable which is so large that nothing should ever be further than it
	var closestDistance = 9999999999999999999999;
	//Loop over all of the current markers on the screen
	for (var i = 0; i < markers.length; i++) {
		var SingleMarker = markers[i];
		//What this does is calculates the distance from point a-b in a straight line so doesnt take roads/building etc into consideration
		//What you need to do is add on the geometry library to where you first call google maps (probably on your index page)
		//You need 2 values, point A and point B and they both need a lat and lng value
		var distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation.position, SingleMarker.position);

		//If the distance between point A and B is less than closestDistance
		if(distance < closestDistance){
			//Then closestDistance becomes the distance betweens the 2 points
			closestDistance = distance;
			//Closest marker then becomes that marker
			closestMarker = SingleMarker;
		}
		currentMarker = closestMarker;
		//This will run for all of your markers on the page so closestMarker/cloesetDistance might change a few times in the loop
	};
}

//This Function gets called with the onchange event on the select option  within the html
// what gets passed through it is the value of whatever is the current option shown in the select
function changeTransport(mode){
	//TransportMode is a new global variable which sets what is the current mode shown on the select
	TransportMode = mode;
	//showDirection needs 2 values, the end position and the transport mode.
	//currentMarker is another new global variable which is defined by the marker you are currently clicked on
	//When the page loads current marker becomes the closest marker because that is the one we have coded to show us the direction to by default
	//When you click on a new marker, that marker becomes the currnet marker
	showDirection(currentMarker.position, TransportMode);
}














