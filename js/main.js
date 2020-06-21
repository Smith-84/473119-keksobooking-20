'use strict';

(function () {

  var setupPageActive = function () {
    window.form.activePage();
    window.setupMapActive();
    window.mapPin.removeEventListener('mousedown', buttonMouseDownHandler);
    window.mapPin.removeEventListener('keydown', buttonKeyDownHandler);
  };


  var buttonMouseDownHandler = function (evt) {
    if (evt.button === 0) {
      setupPageActive();
    }
  };

  var buttonKeyDownHandler = function (evt) {
    if (evt.code === 'Enter') {
      setupPageActive();
    }
  };

  window.mapPin.addEventListener('keydown', buttonKeyDownHandler);
  window.mapPin.addEventListener('mousedown', buttonMouseDownHandler);

})();

