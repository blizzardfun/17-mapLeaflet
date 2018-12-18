//************************************************************** */
// return a color for each magnitude level
function chooseColor(mag) {
    if (mag > 7) {
        return "black"; 
    } else if (mag > 6) {
        return "#B22222";    brickread
    } else if (mag > 5) {
        return "red"; 
    } else if (mag > 4){
        return "orange";  
    } else if (mag > 3) {
        return "yellow";
    } else  {
        return "GreenYellow";   // light yellow
    }
  }


// *******************************************
// file for mapping earthquake data 

function createMap(earthquakes) {
  // Create the base layers that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  });

  var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

  // Create a baseMaps object to hold the different map layers
  var baseMaps = {
    Light : lightmap,
    Satellite : satellite,
    Outdoor : outdoors
  };

  // Create an overlayMaps object to hold the earthquake layer
  var overlayMaps = {
    "Eathquakes": earthquakes
  };

  // Create the map object with options
  var myMap = L.map("map-id", {
    center: [0, 0],
    zoom: 2,
    layers: [lightmap, earthquakes]
  });
//*************************add plate lines to map */
  var link = "static/plateData/PB2002_plates.json"
  d3.json(link, function(error,data) {
    L.geoJson(data).addTo(myMap) })
//****************************** */

  // create a legend ***********
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (myMap) {
  
      var div = L.DomUtil.create('div', 'info legend');
      grades = [2,3,4,5,6,7];
      labels = [];
      div.innerHTML='<div><b>Magnitude Legend</b></div';  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {

          div.innerHTML +=
              '<i style="background:' + chooseColor(grades[i] +1) + ' ">&nbsp; </i>&nbsp;&nbsp; ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
    return div;

    }
    legend.addTo(myMap);

  //************* */
  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}


//**************************************************************** */ 
function createMarkers(response) {

    // get features from response.data
    var features = response.features;

    // Initialize an array to hold markers
    var quakeMarkers = [];
  
    // Loop through the features array and get location and properties
    for (var index = 0; index < features.length; index++) {
      var location = features[index].geometry.coordinates;
      var prop = features[index].properties;
      var tsunami;
     if (prop.tsunami=== 1){
        tsunami="Yes";
     } else {
         tsunami="No"
     };

     // set the color for the marker
     var markerColor= chooseColor(prop.mag);

      // For each quake location, create a marker and bind a popup with the title and magnitude
      var quakeMarker = L.circle([location[1], location[0]], {
                                color: markerColor,
                                fillColor: markerColor,
                                fillOpacity: 0.75,
                                radius:prop.mag * 50000
                                })
        .bindPopup("<h3>Title: " + prop.title + "</h3><h3>Magnitude: " + prop.mag + "</h3><h3> Tsunami:" + tsunami +"</h3><h3>Location:Lat " + location[1] +" Lon "+ location[0] + "</h3>");
  console.log(quakeMarker);
      // Add the marker to the quakeMarkers array
      quakeMarkers.push(quakeMarker);
    }
  
    // Create a layer group made from the markers array, pass it into the createMap function
    createMap(L.layerGroup(quakeMarkers));
  }
  
  // Perform an API call USGS to getearthquake info for last 7 days for earthquakes above 2.5 magnitude information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson", createMarkers);
  