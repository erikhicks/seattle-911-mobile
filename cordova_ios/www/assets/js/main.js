( function( leaflet, $, undefined ) {

  leaflet.assets = {
    icons: {
      black_icon:
        L.icon({
          iconUrl: 'assets/img/pin.png',
          shadowUrl: 'assets/img/pin-shadow.png',
          iconSize: [14, 29],
          iconAnchor: [7, 29],
          shadowSize: [25,18],
          shadowAnchor: [0, 18]
        }),
      emergency_icon:
        L.icon({
          iconUrl: 'assets/img/pin-emergency.png',
          shadowUrl: 'assets/img/pin-shadow.png',
          iconSize: [24, 47],
          iconAnchor: [7, 47],
          shadowSize: [25,18],
          shadowAnchor: [0, 18]
        })
    }
  };

  leaflet.init = function () {
    console.log('init');

    this.map = L.map('map');
    this.mapOptions = {zoom: 16, detectRetina: true};
    this.map.element = $('#map');
    this.map.element.width(document.clientWidth);
    this.map.element.height(document.body.clientHeight - $('#footer').height());
    this.myLocation = {};
    this.events = [];
    this.eventLayer = null;

    L.tileLayer('http://{s}.tile.cloudmade.com/5f8bd467aef94255bce0b1b60a59870c/22677@2x/256/{z}/{x}/{y}.png', this.mapOptions).addTo(this.map);

    if (util.isDesktop()) {
      leaflet.processLocation({coords: {latitude: 47.6097, longitude: -122.3331, accuracy: 20}});
    } else {
      document.addEventListener("deviceready", leaflet.getLocation, false);
    }

    // jQuery Mobile options
    $.extend(  $.mobile , {
      buttonMarkup: {
        hoverDelay: 0
      },
      pageContainer: $('#container')
    });

    // Enable cross-site
    $.support.cors = true;

    leaflet.getEvents();
    ui.init();
  };

  leaflet.getLocation = function() {
    if (navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(leaflet.processLocation, leaflet.locationError);
    }
  };

  leaflet.processLocation = function (e) {
    var radius = e.coords.accuracy / 2;
    var latLng = new L.LatLng(e.coords.latitude, e.coords.longitude);

    leaflet.map.setView(latLng, 16);

    if (leaflet.myLocation.marker) {
      leaflet.map.removeLayer(leaflet.myLocation.marker);
      leaflet.map.removeLayer(leaflet.myLocation.circle);
    }

    leaflet.myLocation.circle = L.circle(latLng, radius);
    leaflet.myLocation.marker = leaflet.placeMarker(latLng, {icon: leaflet.assets.icons.black_icon});
    leaflet.myLocation.circle.addTo(leaflet.map);
  };

  leaflet.placeMarker = function (latLng, options) {
    var marker = L.marker(latLng, options);
    marker.addTo(leaflet.map);
    return marker;
  };

  leaflet.clearEvents = function () {
    $('#eventList').empty();
    if (leaflet.eventLayer) {
      leaflet.map.removeLayer(leaflet.eventLayer);
    }
  };

  leaflet.locationError = function (e) {
    console.log('locationError');
    console.log(e.message);
  };

  leaflet.getEvents = function () {
    $.getJSON('http://data.seattle.gov/api/views/kzjm-xkqj/rows.json?jsonp=?&max_rows=25', function(data) {
      leaflet.processEvents(data);
    });
  };

  leaflet.processEvents = function (data) {
    if (data.data) {
      leaflet.clearEvents();
      leaflet.eventLayer = new L.layerGroup();
    }

    $.each(data.data, function(index, event) {
      var eventObject = {
        time: new Date(event[3] * 1000),
        timeEpoch: event[3],
        address: event[8],
        incident: event[9],
        lat: event[11],
        lon: event[12]
      };

      var latLng = new L.LatLng(eventObject.lat, eventObject.lon);
      L.marker(latLng, {icon: leaflet.assets.icons.emergency_icon}).addTo(leaflet.eventLayer);
      logEvent(eventObject);
    });

    leaflet.map.addLayer(leaflet.eventLayer);
  };

  logEvent = function (eventObject) {
    console.log(eventObject);

    var eventItem = $('<li>');
    var eventLink = $('<a href="#" data-rel="back">');
    var eventTitle = $('<h3>').html(eventObject.incident);
    var eventText = $('<p>').html(eventObject.address + ' - ' + util.getTimeSince(eventObject.timeEpoch) + ' ago.');

    eventTitle.appendTo(eventLink);
    eventText.appendTo(eventLink);
    eventLink.appendTo(eventItem);
    eventItem.appendTo($('#eventList'));
  };

}( window.leaflet = window.leaflet || {}, jQuery ));
 
$(function () {
  $(document).ready(
    function () {
      leaflet.init();
    }
  );
});