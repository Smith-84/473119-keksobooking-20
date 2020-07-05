'use strict';
(function () {
  window.upload = function (data, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        onError();
      }
    });
    xhr.open('POST', url);
    xhr.send(data);
  };
})();
