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

    var adsData = window.data.createAdsData()

    for (var i = 0; i < adsData.length; i++) {
      var newAdsElement = createMapPin(adsData[i], i);
      fragment.appendChild(newAdsElement);
    }

    cityMapAds.appendChild(fragment);
  }

  var handler = function (evt) {
      console.log('hui')
      if (window.card.openedCard) {
        window.card.openedCard.remove();
      }

      var newCard;
      var buttonPin = evt.target.dataset.card;
      var imgPin = evt.target.parentNode.dataset.card;

      if (buttonPin) {
        newCard = window.card.createCard(window.data.ads[buttonPin]);
      } else if (imgPin) {
        newCard = window.card.createCard(window.data.ads[imgPin]);
      } else {
        return;
      }

      window.card.openedCard = newCard;
      console.log(window.card.openedCard)
      // window.card.closeOpenedCardHandler();
      mapFilters.before(newCard);

    }


  var btnMapPins = function () {
    cityMapAds.addEventListener('click', handler);
  }

  var buttonMouseDownHandler = function (evt) {
    if (evt.button === 0) {
      cityMap.classList.remove('map--faded');
      window.form.activePage();
      mapPin.removeEventListener('mousedown', buttonMouseDownHandler);
      // mapPin.removeEventListener('keydown', buttonKeyDownHandler);
      renderNewAds();
      btnMapPins()
      }
    };


  // var buttonKeyDownHandler = function (evt) {
  //   if (evt.code === 'Enter') {
  //     cityMap.classList.remove('map--faded');
  //     window.form.activePage();
  //     mapPin.removeEventListener('mousedown', buttonMouseDownHandler);
  //     mapPin.removeEventListener('keydown', buttonKeyDownHandler);
  //
  //     renderNewAds();
  //
  //     cityMapAds.addEventListener('click', function (evt) {
  //       window.card.getNewCard(evt)
  //       // console.log(evt)
  //       // mapFilters.before(window.card.getNewCard(evt));
  //
  //     });
  //   }
  // };


  mapPin.addEventListener('mousedown', buttonMouseDownHandler);
  // mapPin.addEventListener('keydown', buttonKeyDownHandler);

  window.mapPin = mapPin

})();
