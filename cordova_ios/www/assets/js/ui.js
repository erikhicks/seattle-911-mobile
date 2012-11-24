( function( ui, $, undefined ) {
  
  ui.init = function () {
    hydrateButtons();
  };

  hydrateButtons = function () {
    $.each($('[data-role=button]'), function (index, button) {
      $(button).bind('tap', function() {
        var action_name = $(this).attr('href').replace('#','');
        window.ui[action_name + '_click']();
      });
    });
  };

  ui.locate_me_click = function () {
    leaflet.getLocation();
  };

  ui.show_list_click = function () {
    
  };

}( window.ui = window.ui || {}, jQuery ));
