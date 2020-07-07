'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  window.getFilteredAds = function (ads) {
    return ads.filter(function (ad) {
      return ad.offer.type === housingType.value || housingType.value === 'any';
    }).filter(function (ad) {
      return ad.offer.rooms === Number(housingRooms.value) || housingRooms.value === 'any';
    }).filter(function (ad) {
      if (housingPrice.value === 'low') {
        return ad.offer.price < 10000;
      } else if (housingPrice.value === 'middle') {
        return ad.offer.price < 50000 && ad.offer.price >= 1000;
      } else if (housingPrice.value === 'high') {
        return ad.offer.price >= 50000;
      } else {
        return ad;
      }
    }).filter(function (ad) {
      if (housingGuests.value === '1') {
        return ad.offer.guests === 1;
      } else if (housingGuests.value === '2') {
        return ad.offer.guests === 2;
      } else if (housingGuests.value === '0') {
        return ad.offer.guests === 0;
      } else {
        return ad;
      }
    });
  };

})();
