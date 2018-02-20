'use strict';

(function () {

  window.renderCard = function (offerNumber) {
    var similarCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('img').setAttribute('src', window.offers[offerNumber].author.avatar);
    cardElement.querySelector('h3').textContent = window.offers[offerNumber].offer.title;
    cardElement.querySelector('p small').textContent = window.offers[offerNumber].offer.address;
    cardElement.querySelector('.popup__price').textContent = window.offers[offerNumber].offer.price;
    cardElement.querySelector('h4').textContent = window.offers[offerNumber].offer.type;
    cardElement.querySelector('h4 + p').textContent = window.offers[offerNumber].offer.rooms + ' комнат для ' + window.offers[offerNumber].offer.guests + ' гостей';
    cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + window.offers[offerNumber].offer.checkin + ', выезд до ' + window.offers[offerNumber].offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(renderFeatures(window.offers[offerNumber].offer.features));
    cardElement.querySelector('ul + p').textContent = window.offers[offerNumber].offer.description;
    cardElement.querySelector('.popup__pictures').appendChild(renderPictures(window.offers[offerNumber].offer.photos));
    return cardElement;
  };


  var renderFeatures = function (features) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var newElement = document.createElement('li');
      newElement.className = 'feature feature--' + features[i];
      fragment.appendChild(newElement);
    }
    return fragment;
  };


  var renderPictures = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var similarElement = document.querySelector('template').content.querySelector('.popup__pictures li').cloneNode(true);
      similarElement.querySelector('img').setAttribute('src', photos[i]);
      similarElement.querySelector('img').setAttribute('height', 60);
      similarElement.querySelector('img').setAttribute('width', 60);
      fragment.appendChild(similarElement);
    }
    return fragment;
  };
})();
