'use strict';
(function () {
  window.upload = function (data, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onSuccess();
    });
    xhr.open('POST', url);
    xhr.send(data);
  };
})();
