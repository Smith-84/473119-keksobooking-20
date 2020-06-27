'use strict';

(function () {

  var cityMap = document.querySelector('.map');
  var cityMapAds = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');
  var openCardOnMap = null;

  var renderPinsOnMap = function (adsData, createPin) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adsData.length; i++) {
      var newAdsElement = createPin(adsData[i], i);
      fragment.appendChild(newAdsElement);
    }
    cityMapAds.appendChild(fragment);
  };

  var renderCardOnMap = function (card) {
    openCardOnMap = card;
    mapFilters.before(card);
  };

  var closeCardOnMap = function () {
    if (openCardOnMap) {
      openCardOnMap.remove();
    }
  };

  var setupMapActive = function (adsData, mapClickHandler, mapKeyDownHandler) {
    cityMap.classList.remove('map--faded');
    cityMapAds.addEventListener('click', mapClickHandler);
    cityMapAds.addEventListener('keydown', mapKeyDownHandler);
  };

  window.map = {
    mapOverlay: cityMapAds,
    setupMapActive: setupMapActive,
    renderCardOnMap: renderCardOnMap,
    renderPinsOnMap: renderPinsOnMap,
    closeCardOnMap: closeCardOnMap
  };


})();
