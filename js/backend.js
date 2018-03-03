'use strict';

(function () {
  var STATUS_OK = 200;
  var TIME_OUT = 10000;

  window.setup = function (method, data, onSuccess, onError, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var validStatus = xhr.response;
      var invalidStatus = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      var status = xhr.status === STATUS_OK ? onSuccess(validStatus) : onError(invalidStatus);
      return status;
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT;

    xhr.open(method, url);
    xhr.send(data);
  };
})();
