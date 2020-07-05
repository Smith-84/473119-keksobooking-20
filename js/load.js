'use strict';

(function () {
  window.load = function (url, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      }
    });
    xhr.timeout = 1000;
    xhr.open('GET', url);
    xhr.send();

  };
})();
