'use strict';

(function () {

  var mapPin = document.querySelector('.map__pin--main');

  var setupPageActive = function () {
    var adsData = window.data.createAdsData();

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
