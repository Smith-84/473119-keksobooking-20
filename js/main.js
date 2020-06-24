'use strict';

(function () {

  var setupPageActive = function () {
    window.form.activePage();
    window.map.setupMapActive();
    window.map.mapPin.removeEventListener('mousedown', buttonMouseDownHandler);
    window.map.mapPin.removeEventListener('keydown', buttonKeyDownHandler);
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

  window.map.mapPin.addEventListener('keydown', buttonKeyDownHandler);
  window.map.mapPin.addEventListener('mousedown', buttonMouseDownHandler);

}
)();
