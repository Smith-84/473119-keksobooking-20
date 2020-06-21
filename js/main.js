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
    'features': typeFeatures.slice(getRandomInt(0, 2), getRandomInt(3, typeFeatures.length - 1)),
    'description': '',
    'photos': getPhotos()
  };

  return {
    'author': author,
    'offer': offer,
    'location': mapLocation,
  };
};

var createCard = function (ad) {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var newCardBlock = templateCard.cloneNode(true);
  var popupAvatar = newCardBlock.querySelector('.popup__avatar');
  var popupTitle = newCardBlock.querySelector('.popup__title');
  var popupAddress = newCardBlock.querySelector('.popup__text--address');
  var popupPrice = newCardBlock.querySelector('.popup__text--price');
  var popupType = newCardBlock.querySelector('.popup__type');
  var popupCapacity = newCardBlock.querySelector('.popup__text--capacity');
  var popupTime = newCardBlock.querySelector('.popup__text--time');
  var popupFeatures = newCardBlock.querySelector('.popup__features');
  var popupDesc = newCardBlock.querySelector('.popup__description');
  var popupPhotos = newCardBlock.querySelector('.popup__photos');
  var photo = popupPhotos.querySelector('img');
  var namesTypeHouses = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var featuresSetup = function () {
    var fragment = document.createDocumentFragment();
    popupFeatures.innerHTML = '';
    for (var i = 0; i < ad.offer.features.length; i++) {
      var features = document.createElement('li');
      features.className = 'popup__feature popup__feature--' + ad.offer.features[i];
      fragment.appendChild(features);
    }
    return fragment;
  };

  popupTitle.textContent = ad.offer.title;
  popupAddress.textContent = ad.offer.address;
  popupPrice.textContent = ad.offer.price + '₽/ночь.';
  popupType.textContent = namesTypeHouses[ad.offer.type];
  popupCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  popupTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  popupFeatures.appendChild(featuresSetup());
  popupDesc.textContent = ad.offer.description;

  var photosSetup = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var newPhoto = document.createElement('img');
      newPhoto.classList.add(photo.classList);
      newPhoto.src = ad.offer.photos[i];
      newPhoto.alt = photo.alt;
      newPhoto.width = photo.width;
      newPhoto.height = photo.height;
      fragment.appendChild(newPhoto);
    }
    return fragment;
  };

  photo.replaceWith(photosSetup());
  popupAvatar.src = ad.author.avatar;

  return newCardBlock;
};

var createMapPin = function (ad, dataNumber) {
  var pinWidth = 50;
  var pinHeight = 70;
  var templateAds = document.querySelector('#pin').content.querySelector('.map__pin');
  var newAdsBlock = templateAds.cloneNode(true);
  var image = newAdsBlock.querySelector('img');
  newAdsBlock.dataset.card = dataNumber;
  newAdsBlock.style.left = String(ad.location.x - pinWidth / 2) + 'px';
  newAdsBlock.style.top = String(ad.location.y - pinHeight) + 'px';
  image.src = ad.author.avatar;
  image.alt = ad.offer.title;
  return newAdsBlock;
};


var renderNewAds = function (map, adsData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsData.length; i++) {
    var newAdsElement = createMapPin(adsData[i], i);
    fragment.appendChild(newAdsElement);
  }
  map.appendChild(fragment);
};

var closeOpenedCardHandler = function (card) {
  var btnClose = card.querySelector('.popup__close');
  btnClose.addEventListener('click', function () {
    card.remove();
  });
};

var setupAddress = function (status) {
  var address = document.querySelector('#address');
  var mapPinWidth = 65;
  var mapPinHeight = 65;
  var newWidth = Math.round((mapPin.offsetLeft + mapPinWidth / 2));
  if (status.activePage) {
    address.value = newWidth + ',' + (mapPinHeight + mapPin.offsetTop + 10);
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


var setupValidityCapacity = function (capacity, roomCount) {
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
    return 'Для квартиры минимальная цена за ночь 1 000!';
  } else if (typeHouse.value === 'house' && price.value < 5000) {
    return 'Для дома минимальная цена 5 000!';
  } else if (typeHouse.value === 'palace' && price.value < 10000) {
    return 'Для дворца минимальная цена 10 000.';
  } else {
    return '';
  }
};

var getValidateTitle = function (title) {
  if (title.validity.tooShort) {
    return 'Заголовок объявления должен состоять минимум из 30 символов';
  } else if (title.validity.tooLong) {
    return 'Заголовок объявления не должен превышать 100 символов';
  } else {
    return '';
  }
};

var setupPageInactive = function () {
  setupFormElementStatus({disabled: true});
  setupAddress({activePage: false});
};

var setupPriceMinValue = function (typeHouse, price) {
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

var setupPageActive = function () {
  var adForm = document.querySelector('.ad-form');
  var cityMap = document.querySelector('.map');
  var cityMapAds = document.querySelector('.map__pins');
  var title = document.querySelector('#title');
  var capacity = document.querySelector('#capacity');
  var roomCount = document.querySelector('#room_number');
  var typeHouse = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeForm = document.querySelector('.ad-form__element--time');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var mapFilters = document.querySelector('.map__filters-container');
  var openedCard;

  cityMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  mapPin.removeEventListener('mousedown', buttonMouseDownHandler);
  mapPin.removeEventListener('keydown', buttonKeyDownHandler);

  var adsData = createAdsData();

  renderNewAds(cityMapAds, adsData);

  setupFormElementStatus({disabled: false});

  setupAddress({activePage: true});

  cityMapAds.addEventListener('click', function (evt) {

    var getAdNumber = function () {
      var buttonPin = evt.target.dataset.card;
      var imgPin = evt.target.parentNode.dataset.card;
      if (buttonPin) {
        return buttonPin;
      } else if (imgPin) {
        return imgPin;
      } else {
        return false;
      }
    };

    var adNumber = getAdNumber();

    if (adNumber) {
      if (openedCard) {
        openedCard.remove();
      }
      var newCard = createCard(adsData[adNumber]);
      openedCard = newCard;
      closeOpenedCardHandler(newCard);
      mapFilters.before(newCard);
    }

  });

  cityMapAds.addEventListener('keydown', function (evt) {
    if (evt.code === 'Escape') {
      if (openedCard) {
        openedCard.remove();
      }
    }
  });

  timeForm.addEventListener('change', function (evt) {
    if (evt.target === timeIn) {
      timeOut.value = evt.target.value;
    } else {
      timeIn.value = evt.target.value;
    }
  });

  title.addEventListener('input', function () {
    title.setCustomValidity(getValidateTitle(title));
  });

  price.addEventListener('input', function () {
    price.setCustomValidity(getValidatePrice(typeHouse, price));
  });

  typeHouse.addEventListener('change', function () {
    setupPriceMinValue(typeHouse, price);
    price.setCustomValidity(getValidatePrice(typeHouse, price));
  });

  capacity.addEventListener('change', function () {
    setupValidityCapacity(capacity, roomCount);
  });

  roomCount.addEventListener('change', function () {
    setupValidityCapacity(capacity, roomCount);
  });

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
