'use strict';

(function () {

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MAX_GUESTS = 15;
  var MIN_GUESTS = 1;
  var OFFERS_COUNT = 8;
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 150;
  var MAX_Y = 500;
  var AVATARS = ['1', '2', '3', '4', '5', '6', '7', '8'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  window.randomOffers = [];

  var getRandomAvatar = function () {
    var randomIndex = Math.floor(Math.random() * AVATARS.length);
    var avatar = AVATARS[randomIndex];
    AVATARS.splice(randomIndex, 1);
    return avatar;
  };

  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };

  var getRandomIndex = function (arrayLength) {
    var randomIndex = Math.floor(Math.random() * arrayLength);
    return randomIndex;
  };

  var getRandomFeatures = function () {
    var features = [];
    var featuresCount = Math.floor(Math.random() * (FEATURES.length + 1));
    for (var i = 0; i < featuresCount; i++) {
      features.push(FEATURES[i]);
    }
    return features;
  };

  var getRandomType = function () {
    var randomType = TYPES[Math.floor(Math.random() * TYPES.length)];
    switch (randomType) {
      case ('flat'):
        randomType = 'Квартира';
        break;
      case ('bungalo'):
        randomType = 'Бунгало';
        break;
      case ('house'):
        randomType = 'Дом';
        break;
    }
    return randomType;
  };

  var getShuffledPhotos = function () {
    for (var i = PHOTOS.length - 1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var lastPhoto = PHOTOS[i];
      PHOTOS[i] = PHOTOS[randomIndex];
      PHOTOS[randomIndex] = lastPhoto;
    }
    return PHOTOS;
  };

  window.renderFeatures = function (offerNumber) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.randomOffers[offerNumber].offer.features.length; i++) {
      var newElement = document.createElement('li');
      newElement.className = 'feature feature--' + window.randomOffers[offerNumber].offer.features[i];
      fragment.appendChild(newElement);
    }
    return fragment;
  };


  window.renderPictures = function (offerNumber) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 3; i++) {
      var similarElement = document.querySelector('template').content.querySelector('.popup__pictures li').cloneNode(true);
      similarElement.querySelector('img').setAttribute('src', window.randomOffers[offerNumber].offer.photos[i]);
      similarElement.querySelector('img').setAttribute('height', 60);
      similarElement.querySelector('img').setAttribute('width', 60);
      fragment.appendChild(similarElement);
    }
    return fragment;
  };

  var renderOffer = function () {
    var avatar = getRandomAvatar();
    var locationX = getRandomNumber(MIN_X, MAX_X);
    var locationY = getRandomNumber(MIN_Y, MAX_Y);
    var title = TITLES[getRandomIndex(TITLES.length)];
    var price = getRandomNumber(MIN_PRICE, MAX_PRICE);
    var type = getRandomType();
    var rooms = getRandomNumber(MIN_ROOMS, MAX_ROOMS);
    var guests = getRandomNumber(MIN_GUESTS, MAX_GUESTS);
    var checkin = CHECK_IN[getRandomIndex(CHECK_IN.length)];
    var checkout = CHECK_OUT[getRandomIndex(CHECK_OUT.length)];
    var features = getRandomFeatures();
    var photos = getShuffledPhotos();
    var info =
    {
      'author': {
        'avatar': 'img/avatars/user0' + avatar + '.png'
      },

      'offer': {
        'title': title,
        'address': locationX + ',' + locationY,
        'price': price + ' \u20bd/ночь',
        'type': type,
        'rooms': rooms + ' комнаты для ',
        'guests': guests + ' гостей ',
        'checkin': 'Заезд после ' + checkin,
        'checkout': ', выезд до ' + checkout,
        'features': features,
        'description': ' ',
        'photos': photos,
      },

      'location': {
        'x': locationX,
        'y': locationY,
      }
    };
    return info;
  };

  var getRandomOffers = function () {
    for (var i = 0; i < OFFERS_COUNT; i++) {
      var newOffer = renderOffer();
      window.randomOffers.push(newOffer);
    }
  };

  getRandomOffers();


})();
