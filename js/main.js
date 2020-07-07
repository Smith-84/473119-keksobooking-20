'use strict';

(function () {

  var mapPin = document.querySelector('.map__pin--main');
  var mapFiltersForm = document.querySelector('.map__filters');

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var filterWifi = document.querySelector('#filter-wifi');
  var filterParking = document.querySelector('#filter-parking');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');

  var adsData = null;

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

  var mapClickHandler = function (evt) {
    var button = evt.target.closest('button');
    if (button) {
      var numberPin = button.dataset.card;
      if (numberPin) {
        actionOnCloseCard();
        window.pin.pinClickHandler(button);
        var currentAd = adsData.filter(function (ad) {
          return ad.author.avatar.replace(/[^\d;]/g, '') === numberPin;
        })
        var card = window.card.createCard(currentAd[0], actionOnCloseCard);
        window.map.renderCardOnMap(card);
      }
    }
  };

  var mapPinMouseDownHandler = function (evt) {
    window.move.movePin(evt, moveParams);
  };

  var prepareData = function (receivedAds) {
    return receivedAds.filter(function (ad) {
      return ad.offer !== 'undefined';
    });
  };

  var dataSubmitSuccess = function () {
    setupPageInactive();
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    var documentKeyDownHandler = function () {
      successMessage.remove();
      document.removeEventListener('keydown', documentKeyDownHandler);
    };
    document.body.appendChild(successMessage);
    document.addEventListener('keydown', documentKeyDownHandler);
    successMessage.addEventListener('click', function () {
      successMessage.remove();
    });
  };

  var dataSubmitError = function () {
    var main = document.querySelector('main');
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var errorButton = errorMessage.querySelector('.error__button');
    var documentKeyDownHandler = function () {
      errorMessage.remove();
      document.removeEventListener('keydown', documentKeyDownHandler);
    };
    errorButton.addEventListener('click', function () {
      errorMessage.remove();
    });
    document.addEventListener('keydown', documentKeyDownHandler);
    main.appendChild(errorMessage);
  };

  var adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    var url = 'https://javascript.pages.academy/keksobooking';
    window.upload(new FormData(evt.target), url, dataSubmitSuccess, dataSubmitError);
  };

  var adFormResetClickHandler = function () {
    setupPageInactive();
  };


  var getFilteredAds = function (ads) {
    return ads.filter(function (ad) {
      return ad.offer.type === housingType.value || housingType.value === 'any'
    }).filter(function (ad) {
      return ad.offer.rooms === Number(housingRooms.value) || housingRooms.value === 'any'
    }).filter(function (ad) {
      if (housingPrice.value === 'low') {
        return ad.offer.price < 10000
      } else if (housingPrice.value === 'middle') {
        return 1000 >= ad.offer.price < 50000
      } else if (housingPrice.value === 'high') {
        return ad.offer.price >= 50000
      } else {
        return ad
      }
    }).filter(function (ad) {
      return ad.offer.guests === housingGuests.value
      // if (housingGuests.value === 1) {
      //
      // } else if (housingGuests.value === 2) {
      //   return ad.offer.guests = 2
      // } else {
      //   return ad
      // }
    })
  }

  var mapFiltersChangeHandler = function () {
    var filteredAds = getFilteredAds(adsData)
    actionOnCloseCard();
    window.map.renderPinsOnMap(filteredAds.slice(0, window.COUNT_TO_RENDER), window.pin.createPin);
  }


  var dataReceivedSuccess = function (receivedAds) {
    adsData = prepareData(receivedAds);
    mapPin.removeEventListener('mousedown', buttonMouseDownHandler);
    mapPin.removeEventListener('keydown', buttonKeyDownHandler);
    window.form.activateForm(mapPin, adFormSubmitHandler, adFormResetClickHandler);
    window.map.setupMapActive(mapClickHandler, mapKeyDownHandler);
    window.map.renderPinsOnMap(adsData.slice(0,  window.COUNT_TO_RENDER), window.pin.createPin);
    mapFiltersForm.addEventListener('change', mapFiltersChangeHandler)
    mapPin.addEventListener('mousedown', mapPinMouseDownHandler);
  };


  var setupPageActive = function () {
    var url = 'https://javascript.pages.academy/keksobooking/data';
    window.load(url, dataReceivedSuccess);
  };

  var setupPageInactive = function () {
    mapPin.removeEventListener('mousedown', mapPinMouseDownHandler);
    mapPin.style.left = 570 + 'px';
    mapPin.style.top = 375 + 'px';
    window.form.deactivateForm(mapPin, adFormSubmitHandler, adFormResetClickHandler);
    window.map.setupMapInActive(mapClickHandler, mapKeyDownHandler);
    actionOnCloseCard();
    mapPin.addEventListener('keydown', buttonKeyDownHandler);
    mapPin.addEventListener('mousedown', buttonMouseDownHandler);
    adsData = null;
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
