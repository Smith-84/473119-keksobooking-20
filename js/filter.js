'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var inputFeatures = housingFeatures.querySelectorAll('input');

  var createFilter = function () {
    return {
      type: housingType.value,
      price: housingPrice.value,
      rooms: housingRooms.value,
      guests: housingGuests.value,
      features: Array.from(inputFeatures).filter(function (featuresCheckBox) {
        return featuresCheckBox.checked;
      })
    };
  };

  var checkType = function (ad, filterSettings) {
    return ad.offer.type === filterSettings.type || filterSettings.type === 'any';
  };

  var checkRooms = function (ad, filterSettings) {
    return ad.offer.rooms === Number(filterSettings.rooms) || filterSettings.rooms === 'any';
  };

  var checkPrice = function (ad, filterSettings) {
    if (filterSettings.price === 'low') {
      return ad.offer.price < 10000;
    } else if (filterSettings.price === 'middle') {
      return ad.offer.price < 50000 && ad.offer.price >= 10000;
    } else if (filterSettings.price === 'high') {
      return ad.offer.price >= 50000;
    }
    return true;
  };

  var checkGuests = function (ad, filterSettings) {
    if (filterSettings.guests === '1') {
      return ad.offer.guests === 1;
    } else if (filterSettings.guests === '2') {
      return ad.offer.guests === 2;
    } else if (filterSettings.guests === '0') {
      return ad.offer.guests === 0;
    }
    return true;
  };

  var checkFeatures = function (ad, filterSettings) {
    for (var i = 0; i < filterSettings.features.length; i++) {
      if (ad.offer.features.indexOf(filterSettings.features[i].value) === -1) {
        return false;
      }
    }
    return true;
  };

  window.getFilteredAds = function (ads) {
    var filteredAds = [];
    var filerSettings = createFilter();
    var filerActions = [checkType, checkRooms, checkPrice, checkGuests, checkFeatures];

    for (var i = 0; i < ads.length; i++) {
      var flag = true;
      for (var j = 0; j < filerActions.length; j++) {
        if (!filerActions[j](ads[i], filerSettings)) {
          flag = false;
          break;
        }
      }
      if (flag) {
        filteredAds.push(ads[i]);
      }
    }
    return filteredAds;
  };
}
)();
