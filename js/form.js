'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var title = document.querySelector('#title');
  var capacity = document.querySelector('#capacity');
  var roomCount = document.querySelector('#room_number');
  var typeHouse = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeForm = document.querySelector('.ad-form__element--time');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var adFormReset = document.querySelector('.ad-form__reset');

  var setupAddress = function (mapPin, status) {
    var address = document.querySelector('#address');
    var mapPinWidth = mapPin.clientWidth;
    var mapPinHeight = mapPin.clientHeight;
    var newWidth = Math.round((mapPin.offsetLeft + mapPinWidth / 2));
    if (status.activePage) {
      address.value = newWidth + ',' + (mapPinHeight + mapPin.offsetTop + window.TAIL_HEIGHT);
    } else {
      var newHeight = Math.round(mapPinHeight / 2);
      address.value = newWidth + ',' + (newHeight + mapPin.offsetTop);
    }
  };

  var elementsHandler = function (elements, disabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = disabled;
    }
  };

  var setupFormElementStatus = function (status) {
    var fieldSetForm = document.querySelectorAll('fieldset');
    var selectForm = document.querySelectorAll('select');
    elementsHandler(fieldSetForm, status.disabled);
    elementsHandler(selectForm, status.disabled);
  };

  var setupValidityCapacity = function () {
    var capVal = capacity.options[capacity.selectedIndex].value;
    var roomVal = roomCount.options[roomCount.selectedIndex].value;
    if (roomVal === '1' && capVal !== '1') {
      capacity.setCustomValidity('Для одной комнаты - один гость!');
    } else if (roomVal === '2' && capVal !== '1' && capVal !== '2') {
      capacity.setCustomValidity('Для двух комнат - один или два гостя!');
    } else if (roomVal === '3' && capVal === '0') {
      capacity.setCustomValidity('Для трех комнат - нельзя выбрать - Не для гостей');
    } else if (roomVal === '100' && capVal !== '0') {
      capacity.setCustomValidity('Только возможно для не гостей!');
    } else {
      capacity.setCustomValidity('');
    }
  };


  var getValidatePrice = function () {
    if (typeHouse.value === 'flat' && price.value < 1000) {
      return 'Для квартиры минимальная цена за ночь 1 000!';
    } else if (typeHouse.value === 'house' && price.value < 5000) {
      return 'Для дома минимальная цена 5 000!';
    } else if (typeHouse.value === 'palace' && price.value < 10000) {
      return 'Для дворца минимальная цена 10 000.';
    } else {
      return '';
    }
  };

  var getValidateTitle = function () {
    if (title.validity.tooShort) {
      return 'Заголовок объявления должен состоять минимум из 30 символов';
    } else if (title.validity.tooLong) {
      return 'Заголовок объявления не должен превышать 100 символов';
    } else {
      return '';
    }
  };


  var setupPriceMinValue = function () {
    switch (typeHouse.value) {
      case 'flat':
        price.min = 1000;
        price.placeholder = 1000;
        break;
      case 'house':
        price.min = 5000;
        price.placeholder = 5000;
        break;
      case 'palace':
        price.min = 10000;
        price.placeholder = 10000;
        break;
      default:
        price.min = 0;
        price.placeholder = 0;
    }
  };

  var titleInputHandler = function () {
    title.setCustomValidity(getValidateTitle());
  };

  var priceInputHandler = function () {
    price.setCustomValidity(getValidatePrice());
  };

  var typeHouseChangeHandler = function () {
    setupPriceMinValue();
    price.setCustomValidity(getValidatePrice());
  };

  var capacityChangeHandler = function () {
    setupValidityCapacity();
  };

  var roomCountChangeHandler = function () {
    setupValidityCapacity();
  };


  var activateForm = function (mapPin, adFormSubmitHandler, adFormResetClickHandler) {
    adForm.classList.remove('ad-form--disabled');
    setupFormElementStatus({disabled: false});
    setupAddress(mapPin, {activePage: true});

    timeForm.addEventListener('change', function (evt) {
      if (evt.target === timeIn) {
        timeOut.value = evt.target.value;
      } else {
        timeIn.value = evt.target.value;
      }
    });

    title.addEventListener('input', titleInputHandler);
    price.addEventListener('input', priceInputHandler);
    typeHouse.addEventListener('change', typeHouseChangeHandler);
    capacity.addEventListener('change', capacityChangeHandler);
    roomCount.addEventListener('change', roomCountChangeHandler);
    adForm.addEventListener('submit', adFormSubmitHandler);
    adFormReset.addEventListener('click', adFormResetClickHandler);
  };

  var removeAdFormAllEvtList = function (adFormSubmitHandler, adFormResetClickHandler) {
    adForm.reset();
    title.removeEventListener('input', titleInputHandler);
    price.removeEventListener('input', priceInputHandler);
    typeHouse.removeEventListener('change', typeHouseChangeHandler);
    capacity.removeEventListener('change', capacityChangeHandler);
    roomCount.removeEventListener('change', roomCountChangeHandler);
    adForm.removeEventListener('submit', adFormSubmitHandler);
    adFormReset.removeEventListener('click', adFormResetClickHandler);
  };

  var deactivateForm = function (mapPin, adFormSubmitHandler, adFormResetClickHandler) {
    if (adFormSubmitHandler && adFormResetClickHandler) {
      adForm.classList.add('ad-form--disabled');
      removeAdFormAllEvtList(adFormSubmitHandler, adFormResetClickHandler);
    }
    setupFormElementStatus({disabled: true});
    setupAddress(mapPin, {activePage: false});

  };

  window.form = {
    activateForm: activateForm,
    deactivateForm: deactivateForm,
    setupAddress: setupAddress
  };

})();
