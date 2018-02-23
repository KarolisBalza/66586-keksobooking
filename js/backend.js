'use strict';

(function () {

  window.setup = function (method, data, onSuccess, onError, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var validStatus = xhr.response;
      var invalidStatus = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      var status = xhr.status === 200 ? onSuccess(validStatus) : onError(invalidStatus);
      return status;
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open(method, url);
    xhr.send(data);
  };
})();
