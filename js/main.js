'use strict';

(function () {

  var mapPin = document.querySelector('.map__pin--main');
  var adsData = null

  var moveParams = {
    moveElem: mapPin,
    mapOverlay: window.map.mapOverlay,
    setupAddress: window.form.setupAddress
  };

  var actionOnCloseCard = function () {
    window.pin.deactivatePin();
    window.map.closeCardOnMap();
  };

  var mapKeyDownHandler = function (evt) {
    if (evt.code === 'Escape') {
      actionOnCloseCard();
    }
  };

  var mapKeyDownHandler = function (evt) {
    if (evt.code === 'Escape') {
      actionOnCloseCard();
    }
  };

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

  var mapPinMouseDownHandler = function (evt) {
    window.move.movePin(evt, moveParams);
  };

  var adFormSubmitHandler = function (evt) {
    evt.preventDefault()
    var url = 'https://javascript.pages.academy/keksobooking';
    window.upload(new FormData(evt.target), url, dataSubmitSuccess, dataSubmitError)
  }

  var adFormResetClickHandler = function () {
    setupPageInactive();
  }

  var prepareData = function (receivedAds) {
    return receivedAds.slice(0, window.ADS_COUNT).filter(ad => typeof ad.offer !== "undefined")
  };

  documentKeyDown


  var dataSubmitSuccess = function () {
    setupPageInactive();
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    document.body.appendChild(successMessage)

    document.addEventListener('keydown', function (evt) {
        if (evt.code === 'Escape') {
          successMessage.remove()
        }
    })

    successMessage.addEventListener('click', function () {
      successMessage.remove()
    })

  }

  var dataSubmitError= function () {
  }


  var dataReceivedSuccess = function (receivedAds) {
    adsData = prepareData(receivedAds);
    mapPin.removeEventListener('mousedown', buttonMouseDownHandler);
    mapPin.removeEventListener('keydown', buttonKeyDownHandler);
    window.form.activateForm(mapPin, adFormSubmitHandler, adFormResetClickHandler);
    window.map.setupMapActive(adsData, mapClickHandler, mapKeyDownHandler);
    window.map.renderPinsOnMap(adsData, window.pin.createPin);
    mapPin.addEventListener('mousedown', mapPinMouseDownHandler);
  };


  var setupPageActive = function () {
    var url = 'https://javascript.pages.academy/keksobooking/data';
    window.load(url, dataReceivedSuccess);
  };

  var setupPageInactive = function () {
    mapPin.removeEventListener('mousedown', mapPinMouseDownHandler)
    mapPin.style.left = 570 + 'px';
    mapPin.style.top = 375 + 'px';
    window.form.deactivateForm(mapPin, adFormSubmitHandler, adFormResetClickHandler);
    window.map.setupMapInActive(mapClickHandler, mapKeyDownHandler)
    actionOnCloseCard();
    mapPin.addEventListener('keydown', buttonKeyDownHandler);
    mapPin.addEventListener('mousedown', buttonMouseDownHandler);
    var adsData = null
  }




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
