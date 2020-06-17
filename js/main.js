'use strict';

var ADS_COUNT = 8;


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


var createMapPin = function (ad) {
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

var createCard = function (ad) {
  var fragment = document.createDocumentFragment();
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var newCardBlock = templateCard.cloneNode(true);

  var namesTypeHouses = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  }

  var popupTitle = newCardBlock.querySelector('.popup__title')
  popupTitle.textContent = ad.offer.title

  var popupAddress = newCardBlock.querySelector('.popup__text--address')
  popupAddress.textContent = ad.offer.address

  var popupPrice = newCardBlock.querySelector('.popup__text--price')
  popupPrice.textContent = ad.offer.price + '₽/ночь.'

  var popupType = newCardBlock.querySelector('.popup__type')
  popupType.textContent = namesTypeHouses[ad.offer.type]

  var popupCapacity = newCardBlock.querySelector('.popup__text--capacity')
  popupCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей'

  var popupTime = newCardBlock.querySelector('.popup__text--time')
  popupTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout

  var popupFeatures =newCardBlock.querySelector(' .popup__features')

  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  }

  for (var i = 0; i < ad.offer.features.length; i++) {
    var features = document.createElement('li');
    features.className = 'popup__feature popup__feature--' + ad.offer.features[i]
    fragment.appendChild(features);
  }
  popupFeatures.appendChild(fragment);

  var popupDesc = newCardBlock.querySelector('.popup__description')
  popupDesc.textContent = ad.offer.description

  var popupPhotos = newCardBlock.querySelector('.popup__photos')
  var photo = popupPhotos.querySelector('img');
  photo.src = ad.offer.photos[0]

  if (ad.offer.photos.length > 1) {
    for (var i = 1; i < ad.offer.photos.length; i++) {
      var newPhoto = photo.cloneNode();
      newPhoto.src = ad.offer.photos[i]
      popupPhotos.appendChild(newPhoto)
    }
  }

  var popupAvatar = newCardBlock.querySelector('.popup__avatar')
  popupAvatar.src = ad.author.avatar

  var featuresSetup = function () {
    var fragment = document.createDocumentFragment();

    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }

    for (var i = 0; i < ad.offer.features.length; i++) {
      var features = document.createElement('li');
      features.className = 'popup__feature popup__feature--' + ad.offer.features[i];
      fragment.appendChild(features);
    }
    return fragment;
  };

  popupFeatures.appendChild(featuresSetup());

  var popupDesc = newCardBlock.querySelector('.popup__description');
  popupDesc.textContent = ad.offer.description;

  var popupPhotos = newCardBlock.querySelector('.popup__photos');
  var photo = popupPhotos.querySelector('img');
  photo.src = ad.offer.photos[0];

  if (ad.offer.photos.length > 1) {
    for (var i = 1; i < ad.offer.photos.length; i++) {
      var newPhoto = photo.cloneNode();
      newPhoto.src = ad.offer.photos[i];
      popupPhotos.appendChild(newPhoto);
    }
  }

  var popupAvatar = newCardBlock.querySelector('.popup__avatar');
  popupAvatar.src = ad.author.avatar;

  return newCardBlock;
};

var renderNewElements = function (adsData, func) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsData.length; i++) {
    var newElement = func(adsData[i]);
    fragment.appendChild(newElement);
  }
  return fragment;
};

var init = function () {
  var cityMap = document.querySelector('.map');
  var cityMapAds = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');

  var adsData = createAdsData();
  cityMap.classList.remove('map--faded');

  cityMapAds.appendChild(renderNewElements(adsData, createMapPin));
  mapFilters.before(renderNewElements(adsData, createCard));
};


init();
