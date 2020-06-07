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
  var author = {
    'avatar': 'img/avatars/user0' + String(photoNumber) + '.png'
  };

  var mapLocation = {
    /*
    1200 - это максимальная ширина верски и блока...взял из css
    */
    'x': String(getRandomInt(0, 1200)),
    'y': String(getRandomInt(130, 630))
  };

  var typeHouse = ['palace', 'flat', 'house', 'bungalo'];
  var typeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var availableTimes = ['12:00', '13:00', '14:00'];
  /*
   массив строк случайной длины
   Вообще непонятно...максимальная длина этого массива 3?
   */
  var photoHouse = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var offer = {
    /*
    Откуда данные брать-то  title, price и т.д
    */
    'title': '',
    'address': mapLocation.x + ',' + mapLocation.y,
    'price': 0,
    'type': typeHouse[getRandomInt(0, typeHouse.length - 1)],
    'rooms': 0,
    'guests': 0,
    'checkin': availableTimes[getRandomInt(0, availableTimes.length - 1)],
    'checkout': availableTimes[getRandomInt(0, availableTimes.length - 1)],
    'features': typeFeatures[getRandomInt(0, typeFeatures.length - 1)],
    'description': '',
    'photos': photoHouse[getRandomInt(0, typeFeatures.length - 1)]
  };

  var newAds = {
    'author': author,
    'offer': offer,
    'location': mapLocation,
  };
  return newAds;
};


var createNewElement = function () {
  /*
   Цитата:
    У метки укажите:
    Координаты: style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"
    .....

  Откуда это смещение брать?...или вот прям так прописывать тупо newAds.style.left = {location.x + смещение по X}}px;
  и так далее?
  ??????

   */
  var templateAds = document.querySelector('#pin').content.querySelector('.map__pin');
  var ads = createAdsData();
  for (var i = 0; i < ads.length; i++) {
    var newAdsBlock = templateAds.cloneNode(true);
    newAdsBlock.style.left = ads[i].location.x + 'px';
    newAdsBlock.style.top = ads[i].location.y + 'px';
    newAdsBlock.children[0].src = ads[i].author.avatar;
    newAdsBlock.children[0].alt = ads[i].offer.title;
  }

};

createNewElement();
