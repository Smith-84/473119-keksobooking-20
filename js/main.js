'use strict';

var ADS_COUNT = 8;

var cityMap = document.querySelector('.map');
cityMap.classList.remove('map--faded');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var createAdsData = function () {
  var myAds = [];
  for (var i = 0; i < ADS_COUNT; i++) {
    myAds.push(getAds(i + 1));
  }
  return myAds;
};

var getAds = function (photoNumber) {
  var maxRooms = 3;
  var minPrice = 100;
  var maxPrice = 200;
  var maxGuests = 4;

  var author = {
    'avatar': 'img/avatars/user0' + String(photoNumber) + '.png'
  };

  var mapLocation = {
    'x': String(getRandomInt(0, 1160)),
    'y': String(getRandomInt(130, 630))
  };

  var typeHouse = ['palace', 'flat', 'house', 'bungalo'];
  var typeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var availableTimes = ['12:00', '13:00', '14:00'];

  var offer = {
    'title': '',
    'address': mapLocation.x + ',' + mapLocation.y,
    'price': getRandomInt(minPrice, maxPrice),
    'type': typeHouse[getRandomInt(0, typeHouse.length - 1)],
    'rooms': getRandomInt(1, maxRooms),
    'guests': getRandomInt(1, maxGuests),
    'checkin': availableTimes[getRandomInt(0, availableTimes.length - 1)],
    'checkout': availableTimes[getRandomInt(0, availableTimes.length - 1)],
    'features': typeFeatures[getRandomInt(0, typeFeatures.length - 1)],
    'description': '',
    'photos': []
  };

  var newAds = {
    'author': author,
    'offer': offer,
    'location': mapLocation,
  };
  return newAds;
};


var createNewElement = function (ads) {
  var offsetX = 20;
  var offsetY = 40;
  var templateAds = document.querySelector('#pin').content.querySelector('.map__pin');
  var newAdsBlock = templateAds.cloneNode(true);
  newAdsBlock.style.left = String(Number(ads.location.x) + offsetX) + 'px';
  newAdsBlock.style.top = String(Number(ads.location.y) + offsetY) + 'px';
  newAdsBlock.children[0].src = ads.author.avatar;
  newAdsBlock.children[0].alt = ads.offer.title;
  return newAdsBlock;
};


var renderNewAds = function () {
  var cityMapAds = document.querySelector('.map__pins');
  var ads = createAdsData();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    var newAdsElement = createNewElement(ads[i]);
    fragment.appendChild(newAdsElement);
  }
  cityMapAds.appendChild(fragment);
};

renderNewAds();
