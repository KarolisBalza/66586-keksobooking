'use strict';

(function () {

  var AVATAR_HEIGHT = 70;
  var AVATAR_WIDTH = 50;
  var OFFERS_COUNT = 8;
  var map = document.querySelector('.map');

  var renderPins = function () {
    var template = document.querySelector('.map__pins');
    var similarElement = document.querySelector('template').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < OFFERS_COUNT; i++) {
      var element = similarElement.cloneNode(true);
      element.querySelector('img').setAttribute('src', window.randomOffers[i].author.avatar);
      element.setAttribute('style', 'left: ' + (window.randomOffers[i].location.x - AVATAR_WIDTH / 2) + 'px; ' + 'top:' + (window.randomOffers[i].location.y - AVATAR_HEIGHT) + 'px');
      element.setAttribute('pin-number', i);
      fragment.appendChild(element);
    }
    template.appendChild(fragment);
  };


  window.showPinInfo = function (offerNumber) {
    var mapCard = document.querySelector('.map__card');
    if (map.contains(mapCard)) {
      mapCard.remove();
    }
    var cardFragment = document.createDocumentFragment();

    cardFragment.appendChild(window.renderCard(offerNumber));
    map.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
  };

  renderPins();
  window.showPinInfo(0);

})();
