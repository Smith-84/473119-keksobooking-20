'use strict';

(function () {

  var movePin = function (evt, moveParams) {
    evt.preventDefault();
    moveParams.moveElem.style.zIndex = 2;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var currentX = moveParams.moveElem.offsetLeft - shift.x;
      var currentY = moveParams.moveElem.offsetTop - shift.y;
      if (currentY < 130 - (65 + 10)) {
        currentY = 130 - (65 + 10);
      }
      if (currentY > 630 - (65 + 10)) {
        currentY = 630 - (65 + 10);
      }
      if (currentX > (moveParams.mapOverlay.clientWidth - moveParams.moveElem.clientWidth)) {
        currentX = (moveParams.mapOverlay.clientWidth - moveParams.moveElem.clientWidth);
      }
      if (currentX < 0) {
        currentX = 0;
      }
      moveParams.moveElem.style.left = currentX + 'px';
      moveParams.moveElem.style.top = currentY + 'px';
      moveParams.setupAddress(moveParams.moveElem, {activePage: true});
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      moveParams.mapOverlay.removeEventListener('mousemove', onMouseMove);
      moveParams.mapOverlay.removeEventListener('mouseup', onMouseUp);
    };
    moveParams.mapOverlay.addEventListener('mousemove', onMouseMove);
    moveParams.mapOverlay.addEventListener('mouseup', onMouseUp);
  };

  window.move = {
    movePin: movePin
  };

})();
