'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var cityMap = document.querySelector('.map');
  var cityMapAds = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');
  var activePin = null;

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

  var renderAds = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.limit; i++) {
      if (data[i].offer) {
        var newAdsElement = createMapPin(data[i], i);
        window.data.ads.push(data[i]);
        fragment.appendChild(newAdsElement);
      }
    }
    cityMapAds.appendChild(fragment);
  };

  var cityMapAdsClickHandler = function (evt) {
    var pinOnMap = evt.target.closest('button');
    if (pinOnMap) {
      var numberPin = pinOnMap.dataset.card;
      if (numberPin) {
        if (activePin) {
          activePin.classList.remove('map__pin--active');
        }
        activePin = pinOnMap;
        pinOnMap.classList.add('map__pin--active');
        mapFilters.before(window.card.getOpenedCard(numberPin));
      }
    }
  };

  var cityMapAdsKeyDownHandler = function (evt) {
    if (evt.code === 'Escape') {
      window.card.closeOpenCard();
    }
  };

  var setupMapActive = function () {
    cityMap.classList.remove('map--faded');
    window.load(renderAds);
    cityMapAds.addEventListener('click', cityMapAdsClickHandler);
    cityMapAds.addEventListener('keydown', cityMapAdsKeyDownHandler);
  };

  window.map = {
    mapPin: mapPin,
    setupMapActive: setupMapActive,
  };


})();
