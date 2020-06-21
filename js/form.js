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

  var setupAddress = function (status) {
    var address = document.querySelector('#address');
    var mapPinWidth = 65;
    var mapPinHeight = 65;
    var newWidth = Math.round((window.mapPin.offsetLeft + mapPinWidth / 2));
    if (status.activePage) {
      address.value = newWidth + ',' + (mapPinHeight + window.mapPin.offsetTop + 10);
    } else {
      var newHeight = Math.round(mapPinHeight / 2);
      address.value = newWidth + ',' + (newHeight + window.mapPin.offsetTop);
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
        break;
      case 'house':
        price.min = 5000;
        break;
      case 'palace':
        price.min = 10000;
        break;
      default:
        price.min = 0;
    }
  };

  var setupFormActive = function () {
    adForm.classList.remove('ad-form--disabled');
    setupFormElementStatus({disabled: false});
    setupAddress({activePage: true});
    timeForm.addEventListener('change', function (evt) {
      if (evt.target === timeIn) {
        timeOut.value = evt.target.value;
      } else {
        timeIn.value = evt.target.value;
      }
    });

    title.addEventListener('input', function () {
      title.setCustomValidity(getValidateTitle());
    });

    price.addEventListener('input', function () {
      price.setCustomValidity(getValidatePrice());
    });

    typeHouse.addEventListener('change', function () {
      setupPriceMinValue();
      price.setCustomValidity(getValidatePrice());
    });

    capacity.addEventListener('change', function () {
      setupValidityCapacity();
    });

    roomCount.addEventListener('change', function () {
      setupValidityCapacity();
    });
  };

  var setupFormNotActive = function () {
    setupFormElementStatus({disabled: true});
    setupAddress({activePage: false});
  };

  setupFormNotActive();

  window.form = {
    activePage: setupFormActive,
    notActivePage: setupFormNotActive
  };

})();
