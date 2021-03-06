'use strict';

(function () {

  window.move = function (evt, moveParams) {
    evt.preventDefault();
    moveParams.moveElem.style.zIndex = 2;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var mapOverlayMouseMoveHandler = function (moveEvt) {
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

      if (currentY < window.const.MIN_LIMIT_Y - (moveParams.moveElem.clientHeight + window.const.TAIL_HEIGHT)) {
        currentY = window.const.MIN_LIMIT_Y - (moveParams.moveElem.clientHeight + window.const.TAIL_HEIGHT);
      }

      if (currentY > window.const.MAX_LIMIT_Y - (moveParams.moveElem.clientHeight + window.const.TAIL_HEIGHT)) {
        currentY = window.const.MAX_LIMIT_Y - (moveParams.moveElem.clientHeight + window.const.TAIL_HEIGHT);
      }

      if (currentX > moveParams.mapOverlay.clientWidth - (moveParams.moveElem.clientWidth / 2)) {
        currentX = moveParams.mapOverlay.clientWidth - (moveParams.moveElem.clientWidth / 2);
      }

      if (currentX < 0 - (moveParams.moveElem.clientWidth) / 2) {
        currentX = -(moveParams.moveElem.clientWidth) / 2;
      }

      moveParams.moveElem.style.left = currentX + 'px';
      moveParams.moveElem.style.top = currentY + 'px';
      moveParams.setupAddress(moveParams.moveElem, {activePage: true});
    };

    var documentMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      moveParams.mapOverlay.removeEventListener('mousemove', mapOverlayMouseMoveHandler);
      document.removeEventListener('mouseup', documentMouseUpHandler);
    };
    moveParams.mapOverlay.addEventListener('mousemove', mapOverlayMouseMoveHandler);
    document.addEventListener('mouseup', documentMouseUpHandler);
  };

})();
