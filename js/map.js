'use strict';

(function () {

  var cityMap = document.querySelector('.map');
  var cityMapAds = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');
  var renderedPinsOnMap = [];
  var openCardOnMap = null;

  var renderPins = function (adsData, currentAds, createPin) {
    deleteRenderedPins();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < currentAds.length; i++) {
      var newAdsElement = createPin(currentAds[i], adsData.indexOf(currentAds[i]));
      renderedPinsOnMap.push(newAdsElement);
      fragment.appendChild(newAdsElement);
    }
    cityMapAds.appendChild(fragment);
  };

  var deleteRenderedPins = function () {
    for (var i = 0; i < renderedPinsOnMap.length; i++) {
      renderedPinsOnMap[i].remove();
    }
  };

  var renderCard = function (card) {
    openCardOnMap = card;
    mapFilters.before(card);
  };

  var closeCard = function () {
    if (openCardOnMap) {
      openCardOnMap.remove();
    }
  };

  var setupActive = function (mapClickHandler, mapKeyDownHandler) {
    cityMap.classList.remove('map--faded');
    cityMapAds.addEventListener('click', mapClickHandler);
    cityMapAds.addEventListener('keydown', mapKeyDownHandler);
  };

  var setupInActive = function (mapClickHandler, mapKeyDownHandler) {
    cityMap.classList.add('map--faded');
    deleteRenderedPins();
    cityMapAds.removeEventListener('keydown', mapClickHandler);
    cityMapAds.removeEventListener('keydown', mapKeyDownHandler);
  };

  window.map = {
    mapOverlay: cityMapAds,
    setupActive: setupActive,
    setupInActive: setupInActive,
    renderCard: renderCard,
    renderPins: renderPins,
    closeCard: closeCard
  };


})();
