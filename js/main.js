'use strict';

(function () {

  var mapPin = document.querySelector('.map__pin--main');

  var moveParams = {
    moveElem: mapPin,
    mapOverlay: window.map.mapOverlay,
    setupAddress: window.form.setupAddress
  };

  var mapPinMouseDownHandler = function (evt) {
    window.move.movePin(evt, moveParams);
  };

  var prepareData = function (receivedAds) {
    var readyAds = [];
    for (var i = 0; i < window.ADS_COUNT; i++) {
      if (receivedAds[i].offer) {
        readyAds.push(receivedAds[i]);
      } else {
        i--;
      }
    }
    return readyAds;
  };

  var dataReceivedSuccess = function (receivedAds) {

    var adsData = prepareData(receivedAds);

    mapPin.removeEventListener('mousedown', buttonMouseDownHandler);
    mapPin.removeEventListener('keydown', buttonKeyDownHandler);

    var mapClickHandler = function (evt) {
      var button = evt.target.closest('button');
      if (button) {
        var numberPin = button.dataset.card;
        if (numberPin) {
          actionOnCloseCard();
          window.pin.pinClickHandler(button);
          var card = window.card.createCard(adsData[numberPin], actionOnCloseCard);
          window.map.renderCardOnMap(card);
        }
      }
    };

    var mapKeyDownHandler = function (evt) {
      if (evt.code === 'Escape') {
        actionOnCloseCard();
      }
    };

    var actionOnCloseCard = function () {
      window.pin.deactivatePin();
      window.map.closeCardOnMap();
    };

    window.form.activateForm(mapPin);
    window.map.setupMapActive(adsData, mapClickHandler, mapKeyDownHandler);
    window.map.renderPinsOnMap(adsData, window.pin.createPin);
    mapPin.addEventListener('mousedown', mapPinMouseDownHandler);

  };

  var setupPageActive = function () {
    window.load(dataReceivedSuccess);
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

  window.form.deactivateForm(mapPin);
  mapPin.addEventListener('keydown', buttonKeyDownHandler);
  mapPin.addEventListener('mousedown', buttonMouseDownHandler);

})();
