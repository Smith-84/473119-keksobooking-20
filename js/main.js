'use strict';

(function () {

  var mapPin = document.querySelector('.map__pin--main');
  var mapFiltersForm = document.querySelector('.map__filters');
  var adsData = null;

  var moveParams = {
    moveElem: mapPin,
    mapOverlay: window.map.mapOverlay,
    setupAddress: window.form.setupAddress
  };

  var actionOnCloseCard = function () {
    window.pin.deactivate();
    window.map.closeCard();
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
        var card = window.card.create(adsData[numberPin], actionOnCloseCard);
        window.map.renderCard(card);
      }
    }
  };

  var mapPinMouseDownHandler = function (evt) {
    window.move(evt, moveParams);
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


  var mapFiltersChangeHandler = window.debounce(function (evt) {
    evt.preventDefault();
    var filteredAds = window.getFilteredAds(adsData);
    actionOnCloseCard();
    window.map.renderPins(adsData, filteredAds.slice(0, window.COUNT_TO_RENDER), window.pin.create);
  });

  var dataReceiveSuccess = function (receivedAds) {
    adsData = prepareData(receivedAds);
    mapPin.removeEventListener('mousedown', buttonMouseDownHandler);
    mapPin.removeEventListener('keydown', buttonKeyDownHandler);
    window.form.activate(mapPin, adFormSubmitHandler, adFormResetClickHandler);
    window.map.setupActive(mapClickHandler, mapKeyDownHandler);
    window.map.renderPins(adsData, adsData.slice(0, window.COUNT_TO_RENDER), window.pin.create);
    mapFiltersForm.addEventListener('change', mapFiltersChangeHandler);

  };

  var setupPageActive = function () {
    var url = 'https://javascript.pages.academy/keksobooking/data';
    window.load(url, dataReceiveSuccess);
  };

  var setupPageInactive = function () {
    mapPin.style.left = 570 + 'px';
    mapPin.style.top = 375 + 'px';
    window.form.deactivate(mapPin, adFormSubmitHandler, adFormResetClickHandler);
    window.map.setupInActive(mapClickHandler, mapKeyDownHandler);
    actionOnCloseCard();
    mapFiltersForm.removeEventListener('submit', mapFiltersChangeHandler);
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

  window.form.deactivate(mapPin);
  mapPin.addEventListener('keydown', buttonKeyDownHandler);
  mapPin.addEventListener('mousedown', buttonMouseDownHandler);
  mapPin.addEventListener('mousedown', mapPinMouseDownHandler);

})();
