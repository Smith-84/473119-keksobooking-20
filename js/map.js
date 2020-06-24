'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var cityMap = document.querySelector('.map');
  var cityMapAds = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');

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

  var renderNewAds = function () {
    var fragment = document.createDocumentFragment();
    var adsData = window.data.createAdsData();
    for (var i = 0; i < adsData.length; i++) {
      var newAdsElement = createMapPin(adsData[i], i);
      fragment.appendChild(newAdsElement);
    }
    cityMapAds.appendChild(fragment);
  };

  var cityMapAdsClickHandler = function (evt) {
    if (evt.target.closest('button')) {
      var numberPin = evt.target.closest('button').dataset.card;
      if (numberPin) {
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
    renderNewAds();
    cityMapAds.addEventListener('click', cityMapAdsClickHandler);
    cityMapAds.addEventListener('keydown', cityMapAdsKeyDownHandler);
  }

  window.map = {
    mapPin: mapPin,
    setupMapActive: setupMapActive,
  }


})();
