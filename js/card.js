'use strict';

(function () {

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

    popupTitle.textContent = ad.offer.title;

    popupAddress.textContent = ad.offer.address;

    popupPrice.textContent = ad.offer.price + '₽/ночь.';

    popupType.textContent = namesTypeHouses[ad.offer.type];

    popupCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';

    popupTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    popupFeatures.appendChild(featuresSetup());

    popupDesc.textContent = ad.offer.description;

    photo.replaceWith(photosSetup());

    popupAvatar.src = ad.author.avatar;

    btnClose.addEventListener('click', btnCloseClickHandler);

    return newCardBlock;
  };

  window.card = {
    createCard: createCard
  };

})();
