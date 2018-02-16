'use strict';

(function () {

  window.renderCard = function (offerNumber) {
    var similarCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('img').setAttribute('src', window.randomOffers[offerNumber].author.avatar);
    cardElement.querySelector('h3').textContent = window.randomOffers[offerNumber].offer.title;
    cardElement.querySelector('p small').textContent = window.randomOffers[offerNumber].offer.address;
    cardElement.querySelector('.popup__price').textContent = window.randomOffers[offerNumber].offer.price;
    cardElement.querySelector('h4').textContent = window.randomOffers[offerNumber].offer.type;
    cardElement.querySelector('h4 + p').textContent = window.randomOffers[offerNumber].offer.rooms + window.randomOffers[offerNumber].offer.guests;
    cardElement.querySelector('h4 + p + p').textContent = window.randomOffers[offerNumber].offer.checkin + window.randomOffers[offerNumber].offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(window.renderFeatures(offerNumber));
    cardElement.querySelector('ul + p').textContent = window.randomOffers[offerNumber].offer.description;
    cardElement.querySelector('.popup__pictures').appendChild(window.renderPictures(offerNumber));
    return cardElement;
  };

})();
