( function( util, $, undefined ) {
  
  util.isDesktop = function () {
    if ($.url().param('isDesktop')) {
      return true;
    }

    return false;
  };

  util.getTimeSince = function (startTime) {
    var currentTimeEpoch = parseInt(new Date().getTime() / 1000, 10);
    var timeSince = currentTimeEpoch - startTime;

    var hours, minutes, seconds = 0;

    if (timeSince < 60) {
      return timeSince + ' seconds';
    } else if (timeSince < 3600) {
      seconds = timeSince % 60;
      minutes = parseInt(timeSince / 60, 10);
      return minutes + ' minutes, ' + seconds + ' seconds';
    } else {
      seconds = timeSince % 60;
      minutes = parseInt(timeSince / 60, 10) % 60;
      hours = parseInt(timeSince / 3600, 10);
      return hours + ' hour' + plural(hours) + ', ' + minutes + ' minute' + plural(minutes) + ', ' + seconds + ' seconds';
    }
  };

  plural = function (number) {
    return number == 0 || number > 1 ? 's' : '';
  };

}( window.util = window.util || {}, jQuery ));
