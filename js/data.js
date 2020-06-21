'use strict';

(function () {

  var ADS_COUNT = 8;
  var myAds = [];

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var createAdsData = function () {
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

  window.data = {
    ads: myAds,
    createAdsData: createAdsData
  };

})();
