'use strict';

(function () {

  var AVATAR_HEIGHT = 70;
  var AVATAR_WIDTH = 50;
  var map = document.querySelector('.map');

  window.renderPins = function (array) {
    while (map.contains(document.querySelector('.map__pin:not(.map__pin--main)'))) {
      document.querySelector('.map__pin:not(.map__pin--main)').remove();
    }
    var template = document.querySelector('.map__pins');
    var similarElement = document.querySelector('template').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var element = similarElement.cloneNode(true);
      element.querySelector('img').setAttribute('src', array[i].author.avatar);
      element.setAttribute('style', 'left: ' + (array[i].location.x - AVATAR_WIDTH / 2) + 'px; ' + 'top:' + (array[i].location.y - AVATAR_HEIGHT) + 'px');
      element.setAttribute('pin-number', array[i].index);
      fragment.appendChild(element);
    }
    template.appendChild(fragment);
  };


  window.showPinInfo = function (array, offerNumber) {
    var mapCard = document.querySelector('.map__card');
    if (map.contains(mapCard)) {
      mapCard.remove();
    }
    var cardFragment = document.createDocumentFragment();

    cardFragment.appendChild(window.renderCard(array, offerNumber));
    map.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
  };


})();
