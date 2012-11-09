( function( leaflet, $, undefined ) {
  
  var map = null;

  leaflet.init = function () {

    this.map = L.map('map').setView([47.6097, -122.3331], 13);
    
    L.tileLayer('http://{s}.tile.cloudmade.com/5f8bd467aef94255bce0b1b60a59870c/997/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(this.map);

  };

}( window.leaflet = window.leaflet || {}, jQuery ));
 
$(document).ready( function () {
  leaflet.init();
});