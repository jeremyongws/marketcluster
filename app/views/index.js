var sunway_pinnacle = new google.maps.LatLng(3.069905, 101.609922);
var marker;
var map;
var citymap = {};
citymap['pjs6'] = {
  center: new google.maps.LatLng(3.077084, 101.615655),
  area: 5000,
  crime: 0.15
};
citymap['ss15'] = {
  center: new google.maps.LatLng(3.078627, 101.589348),
  area: 16000,
  crime: 0.25
}
citymap['usj2'] = {
  center: new google.maps.LatLng(3.059811, 101.588531),
  area: 13000,
  crime: 0.65
}
var circle;
var heatMapData = [
  {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
  new google.maps.LatLng(37.782, -122.445),
  {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
  {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
  {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
  new google.maps.LatLng(37.782, -122.437),
  {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

  {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
  {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
  new google.maps.LatLng(37.785, -122.443),
  {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
  new google.maps.LatLng(37.785, -122.439),
  {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
  {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
];

function initialize() {
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(37.782, -122.447), 
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);
  for (var city in citymap) {
    var crimeOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: citymap[city].crime,
      map: map,
      // editable: true,
      center: citymap[city].center,
      radius: Math.sqrt(citymap[city].area) * 3
    };
    cityCircle = new google.maps.Circle(crimeOptions);

  }
  marker = new google.maps.Marker({
    map:map,
    draggable:true,
    animation: google.maps.Animation.DROP,
    position: sunway_pinnacle
  });
  google.maps.event.addListener(marker, 'click', toggleBounce);
}

function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatMapData
});
heatmap.setMap(map);

google.maps.event.addDomListener(window, 'load', initialize);
