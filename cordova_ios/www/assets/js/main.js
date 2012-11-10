( function( leaflet, $, undefined ) {
  
  var map = null;

  leaflet.init = function () {
    this.map = L.map('map');
    this.mapOptions = {zoom: 16, detectRetina: true};

    L.tileLayer('http://{s}.tile.cloudmade.com/5f8bd467aef94255bce0b1b60a59870c/2172@2x/256/{z}/{x}/{y}.png', this.mapOptions).addTo(this.map);

    document.addEventListener("deviceready", leaflet.getLocation, false);

    // this.map.on('locationfound', leaflet.processLocation);
    // this.map.on('locationerror', leaflet.locationError);
  };

  leaflet.getLocation = function() {
    navigator.splashscreen.hide();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(leaflet.processLocation, leaflet.locationError);
    }
  };

  leaflet.processLocation = function (e) {
    var radius = e.coords.accuracy / 2;
    var latLng = new L.LatLng(e.coords.latitude, e.coords.longitude);

    leaflet.map.setView(latLng, 16);

    L.marker(latLng).addTo(leaflet.map).bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(latLng, radius).addTo(leaflet.map);
  };

  leaflet.locationError = function (e) {
    alert(e);
    // console.log('locationError');
    // console.log(e.message);
  };

}( window.leaflet = window.leaflet || {}, jQuery ));
 
$(function () {
  $(document).ready(
    function () {
      leaflet.init();
    }
  );
});