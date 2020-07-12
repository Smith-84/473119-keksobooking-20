'use strict';

(function () {

  var checkElem = function (elem, adProp) {
    if (adProp) {
      elem.textContent = adProp;
      return elem;
    }
    return elem.remove();
  };

  var createCard = function (ad, btnCloseClickHandler) {
    var templateCard = document.querySelector('#card').content.querySelector('.map__card');
    var newCardBlock = templateCard.cloneNode(true);
    var popupAvatar = newCardBlock.querySelector('.popup__avatar');
    var popupTitle = newCardBlock.querySelector('.popup__title');
    var popupAddress = newCardBlock.querySelector('.popup__text--address');
    var popupPrice = newCardBlock.querySelector('.popup__text--price');
    var popupType = newCardBlock.querySelector('.popup__type');
    var popupCapacity = newCardBlock.querySelector('.popup__text--capacity');
    var popupTime = newCardBlock.querySelector('.popup__text--time');
    var popupFeatures = newCardBlock.querySelector('.popup__features');
    var popupDesc = newCardBlock.querySelector('.popup__description');
    var popupPhotos = newCardBlock.querySelector('.popup__photos');
    var photo = popupPhotos.querySelector('img');
    var btnClose = newCardBlock.querySelector('.popup__close');

    var namesTypeHouses = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };

    var featuresSetup = function () {
      var fragment = document.createDocumentFragment();
      popupFeatures.innerHTML = '';
      for (var i = 0; i < ad.offer.features.length; i++) {
        var features = document.createElement('li');
        features.className = 'popup__feature popup__feature--' + ad.offer.features[i];
        fragment.appendChild(features);
      }
      return fragment;
    };

    var photosSetup = function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < ad.offer.photos.length; i++) {
        var newPhoto = document.createElement('img');
        newPhoto.classList.add(photo.classList);
        newPhoto.src = ad.offer.photos[i];
        newPhoto.alt = photo.alt;
        newPhoto.width = photo.width;
        newPhoto.height = photo.height;
        fragment.appendChild(newPhoto);
      }
      return fragment;
    };

    checkElem(popupTitle, ad.offer.title);
    checkElem(popupAddress, ad.offer.address);
    checkElem(popupDesc, ad.offer.description);

    if (ad.offer.price) {
      popupPrice.textContent = ad.offer.price + '₽/ночь.';
    }


    if (ad.offer.type) {
      popupType.textContent = namesTypeHouses[ad.offer.type];
    } else {
      popupType.remove();
    }

    if (ad.offer.rooms && ad.offer.guests) {
      popupCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    } else {
      popupCapacity.remove();
    }

    if (ad.offer.checkin && ad.offer.checkout) {
      popupTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    } else {
      popupTime.remove();
    }

    if (ad.offer.features.length > 0) {
      popupFeatures.appendChild(featuresSetup());
    } else {
      popupFeatures.remove();
    }

    if (ad.offer.photos.length > 0) {
      photo.replaceWith(photosSetup());
    } else {
      popupPhotos.remove();
      photo.remove();
    }

    if (ad.author.avatar) {
      popupAvatar.src = ad.author.avatar;
    } else {
      popupAvatar.remove();
    }

    btnClose.addEventListener('click', btnCloseClickHandler);
    return newCardBlock;
  };

  window.card = {
    createCard: createCard
  };

})();
