'use strict';
(function () {
  window.upload = function (data, url, dataSubmitSuccess, dataSubmitError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        dataSubmitSuccess();
      } else {
        dataSubmitError();
      }
    });
    xhr.open('POST', url);
    xhr.send(data);
  };
})();
