( function( util, $, undefined ) {
  
  util.isDesktop = function () {
    if ($.url().param('isDesktop')) {
      return true;
    }

    return false;
  };

}( window.util = window.util || {}, jQuery ));
