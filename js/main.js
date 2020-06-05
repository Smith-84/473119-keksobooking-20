// 'use strict';

var ADS_COUNT = 8;
var createAdsData = function (ads) {};

var author = {
  'avatar': 'img/avatars/user'
};

var offer = {
    "title": '',
    "address": '',
    "price": 0,
    "type": typeHouse,
    "rooms": 0,
    "guests": 0,
    "checkin": availableTimes,
    "checkout": availableTimes,
    "features":  typeFeatures,
    "description": '',
    "photos": photoHouse
};

var typeHouse = ['palace', 'flat', 'house', 'bungalo'];
var typeFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var availableTimes = ['12:00', '13:00', '14:00'];
var photoHouse = [];

var mapLocation = {
  "x": 0,
  "y": 0,
};

var ads = {
  "author": author,
  "offer": offer,
  "location": mapLocation,
};

var cityMap = document.querySelector('.map');
cityMap.classList.remove('map--faded');

var templateAds = document.querySelector('#pin').content.querySelector('.map__pin');
// style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"

getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

console.log(getRandomInt(0, 1000))
