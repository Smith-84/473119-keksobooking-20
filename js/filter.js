'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var inputFeatures = housingFeatures.querySelectorAll('input')

  var checkValues = function (adValue, currentValue) {
    return adValue === currentValue || currentValue === 'any'
  }

  var checkPrice = function (adValue, currentValue) {
    if (currentValue === 'low') {
      return adValue < 10000;
    } else if (currentValue === 'middle') {
      return adValue < 50000 && adValue >= 10000;
    } else if (currentValue === 'high') {
      return adValue >= 50000;
    }
    return true;
  }

  var checkGuests = function () {
    //   if (housingGuests.value === '1') {
    //     return ad.offer.guests === 1;
    //   } else if (housingGuests.value === '2') {
    //     return ad.offer.guests === 2;
    //   } else if (housingGuests.value === '0') {
    //     return ad.offer.guests === 0;
  }

  window.getFilteredAds = function (ads) {
    return ads
    // for (var i = 0; i < ads.length; i++) {
    //   if (checkValues(ads[i].offer.type, currentData['type'])) {
    //     if (checkValues(ads[i].offer.rooms, currentData['rooms'])) {
    //       if (checkPrice(ads[i].offer.price, currentData['price'])) {
    //
    //       }
    //     }
    //   }
    //   console.log(ads[i].offer.rooms)
    //   console.log(ads[i].offer.guests)
    //   console.log(ads[i].offer.features)
    // }


    // var checkedValues = Array.from(inputFeatures).filter(function (featuresCheckBox) {
    //   if (featuresCheckBox.checked) {
    //     return true
    //   }
    // })
    // console.log(housingType.value)
    // console.log(housingRooms.value)
    // console.log(housingPrice.value)
    // console.log(housingGuests.value)
    // console.log(checkedValues)


    // }).filter(function (ad) {
    //   return ad.offer.rooms === Number(housingRooms.value) || housingRooms.value === 'any';
    // }).filter(function (ad) {
    //   if (housingPrice.value === 'low') {
    //     return ad.offer.price < 10000;
    //   } else if (housingPrice.value === 'middle') {
    //     return ad.offer.price < 50000 && ad.offer.price >= 1000;
    //   } else if (housingPrice.value === 'high') {
    //     return ad.offer.price >= 50000;
    //   } else {
    //     return ad;
    //   }
    // }).filter(function (ad) {

    //   } else {
    //     return ad;
    //   }
    // });
  };

  // function contains(ad, checkedValues){
  //   for(var i=0; i < what.length; i++){
  //     if(where.indexOf(what[i]) == -1) return false;
  //   }
  //   return true;
  // }
  //
  // window.checkFeatures = function () {
  //   var inputFeatures = housingFeatures.querySelectorAll('input:checked')
  //   var checkedValues = Array.from(inputFeatures).map(cb => cb.value);
  //   console.log(checkedValues)
  //
  // }


  // "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
  // "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
})();
