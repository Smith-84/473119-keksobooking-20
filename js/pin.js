'use strict';

(function () {
  var activePin = null;

  var pinClickHandler = function (button) {
    deactivatePin();
    button.classList.add('map__pin--active');
    activePin = button;
  };

  var deactivatePin = function () {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var createPin = function (ad) {
    var pinWidth = 50;
    var pinHeight = 70;
    var templateAds = document.querySelector('#pin').content.querySelector('.map__pin');
    var newPin = templateAds.cloneNode(true);
    var image = newPin.querySelector('img');
    newPin.dataset.card = ad.author.avatar.replace(/[^\d;]/g, '');
    newPin.style.left = String(ad.location.x - pinWidth / 2) + 'px';
    newPin.style.top = String(ad.location.y - pinHeight) + 'px';
    image.src = ad.author.avatar;
    image.alt = ad.offer.title;
    return newPin;
  };

  window.pin = {
    createPin: createPin,
    deactivatePin: deactivatePin,
    pinClickHandler: pinClickHandler
  };

})();
