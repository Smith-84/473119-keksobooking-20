'use strict';

var ADS_COUNT = 8;
var mapPin = document.querySelector('.map__pin--main');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var createAdsData = function () {
  var myAds = [];
  for (var i = 0; i < ADS_COUNT; i++) {
    myAds.push(createAdData(i + 1));
  }
  return myAds;
};

var createAdData = function (numberAd) {
  var maxRooms = 3;
  var minPrice = 100;
  var maxPrice = 200;
  var maxGuests = 4;
  var getPhotos = function () {
    var photoAlbum = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    return photoAlbum.slice(getRandomInt(0, 1), getRandomInt(2, 3));
  };

  var author = {
    'avatar': 'img/avatars/user0' + String(numberAd) + '.png'
  };

  var mapLocation = {
    'x': getRandomInt(0, 1160),
    'y': getRandomInt(130, 630)
  };

  var typeHouse = ['palace', 'flat', 'house', 'bungalo'];
  var typeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var availableTimes = ['12:00', '13:00', '14:00'];

  var offer = {
    'title': 'ad title-0' + String(numberAd),
    'address': String(mapLocation.x) + ',' + String(mapLocation.y),
    'price': getRandomInt(minPrice, maxPrice),
    'type': typeHouse[getRandomInt(0, typeHouse.length - 1)],
    'rooms': getRandomInt(1, maxRooms),
    'guests': getRandomInt(1, maxGuests),
    'checkin': availableTimes[getRandomInt(0, availableTimes.length - 1)],
    'checkout': availableTimes[getRandomInt(0, availableTimes.length - 1)],
    'features': typeFeatures[getRandomInt(0, typeFeatures.length - 1)],
    'description': '',
    'photos': getPhotos()
  };

  return {
    'author': author,
    'offer': offer,
    'location': mapLocation,
  };
};


var createNewElement = function (ad) {
  var pinWidth = 50;
  var pinHeight = 70;
  var templateAds = document.querySelector('#pin').content.querySelector('.map__pin');
  var newAdsBlock = templateAds.cloneNode(true);
  var image = newAdsBlock.querySelector('img');
  newAdsBlock.style.left = String(ad.location.x - pinWidth / 2) + 'px';
  newAdsBlock.style.top = String(ad.location.y - pinHeight) + 'px';
  image.src = ad.author.avatar;
  image.alt = ad.offer.title;
  return newAdsBlock;
};


var renderNewAds = function (map, adsData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsData.length; i++) {
    var newAdsElement = createNewElement(adsData[i]);
    fragment.appendChild(newAdsElement);
  }
  map.appendChild(fragment);
};


var setupAddress = function (activePageFlag) {
  var address = document.querySelector('#address');
  var mapPinWidth = 65;
  var mapPinHeight = 65;
  var newWidth = Math.round((mapPin.offsetLeft + mapPinWidth / 2));
  if (activePageFlag) {
    address.value = newWidth + ',' + (mapPinHeight + mapPin.offsetTop + 10);
  } else {
    var newHeight = Math.round(mapPinHeight / 2);
    address.value = newWidth + ',' + (newHeight + mapPin.offsetTop);
  }
};


var setupRelatedTime = function () {
  var timeForm = document.querySelector('.ad-form__element--time');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeForm.addEventListener('change', function (evt) {
    if (evt.target === timeIn) {
      timeOut.value = evt.target.value;
    } else {
      timeIn.value = evt.target.value;
    }
  });
};


var elementsHandler = function (elements, status) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = status;
  }
};

var setupFormElementStatus = function (status) {
  var fieldSetForm = document.querySelectorAll('fieldset');
  var selectForm = document.querySelectorAll('select');
  elementsHandler(fieldSetForm, status);
  elementsHandler(selectForm, status);
};


var getValidateCapacity = function (capacity, roomCount) {
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

var getValidatePrice = function (typeHouse, price) {
  if (typeHouse.value === 'flat' && price.value < 1000) {
    price.setCustomValidity('Для квартиры минимальная цена за ночь 1 000!');
  } else if (typeHouse.value === 'house' && price.value < 5000) {
    price.setCustomValidity('Для дома минимальная цена 5 000!');
  } else if (typeHouse.value === 'palace' && price.value < 10000) {
    price.setCustomValidity('Для дворца минимальная цена 10 000.');
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Укажите стоимость!');
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Превышена стоимость!');
  } else {
    price.setCustomValidity('');
  }
};

var getValidateTitle = function (title) {
  if (title.validity.tooShort) {
    title.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
  } else if (title.validity.tooLong) {
    title.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
};

var setPriceMinValue = function (typeHouse, price) {
  if (typeHouse.value === 'flat') {
    price.min = 1000;
  } else if (typeHouse.value === 'house') {
    price.min = 5000;
  } else if (typeHouse.value === 'palace' && price.value < 10000) {
    price.min = 10000;
  } else {
    price.min = 0;
  }
};

var setupPageActive = function () {
  var adForm = document.querySelector('.ad-form');
  var cityMap = document.querySelector('.map');
  var cityMapAds = document.querySelector('.map__pins');
  var title = document.querySelector('#title');
  var capacity = document.querySelector('#capacity');
  var roomCount = document.querySelector('#room_number');
  var typeHouse = document.querySelector('#type');
  var price = document.querySelector('#price');

  cityMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  var adsData = createAdsData();

  renderNewAds(cityMapAds, adsData);

  setupFormElementStatus(false);

  setupAddress(true);

  setupRelatedTime();

  title.addEventListener('invalid', function () {
    getValidateTitle(title);
  });

  price.addEventListener('invalid', function () {
    getValidatePrice(typeHouse, price);
  });

  typeHouse.addEventListener('change', function () {
    setPriceMinValue(typeHouse, price);
  });

  capacity.addEventListener('change', function () {
    getValidateCapacity(capacity, roomCount);
  });

  roomCount.addEventListener('change', function () {
    getValidateCapacity(capacity, roomCount);
  });

};

var setupPageInactive = function () {
  setupFormElementStatus(true);
  setupAddress(false);
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

var init = function () {
  setupPageInactive();
  mapPin.addEventListener('mousedown', buttonMouseDownHandler);
  mapPin.addEventListener('keydown', buttonKeyDownHandler);
};

init();
