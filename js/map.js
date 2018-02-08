'use strict';
var OFFERS_COUNT = 8;
var AVATAR_HEIGHT = 40;
var AVATAR_WIDTH = 40;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 150;
var MAX_Y = 500;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MAX_GUESTS = 15;
var MIN_GUESTS = 1;
var AVATARS = ['1', '2', '3', '4', '5', '6', '7', '8'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var randomOffers = [];


var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
  if (randomType === 'flat') {
    randomType = 'Квартира';
  } else if (randomType === 'bungalo') {
    randomType = 'Бунгало';
  } else {
    randomType = 'Дом';
  }
  return randomType;
};

var getShuffledPhotos = function (a) {
  var j;
  var x;
  var i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
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
  var photos = getShuffledPhotos(PHOTOS);
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
    randomOffers.push(newOffer);
  }
};

getRandomOffers();

var renderPins = function () {
  var template = document.querySelector('.map__pins');
  var similarElement = document.querySelector('template').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < OFFERS_COUNT; i++) {
    var element = similarElement.cloneNode(true);
    element.querySelector('img').setAttribute('src', randomOffers[i].author.avatar);
    element.setAttribute('style', 'left: ' + (randomOffers[i].location.x - AVATAR_WIDTH / 2) + 'px; ' + 'top:' + (randomOffers[i].location.y - AVATAR_HEIGHT) + 'px');
    fragment.appendChild(element);
  }
  template.appendChild(fragment);
};

renderPins();


var renderCard = function () {
  var similarCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('img').setAttribute('src', randomOffers[0].author.avatar);
  cardElement.querySelector('h3').textContent = randomOffers[0].offer.title;
  cardElement.querySelector('p small').textContent = randomOffers[0].offer.address;
  cardElement.querySelector('.popup__price').textContent = randomOffers[0].offer.price;
  cardElement.querySelector('h4').textContent = randomOffers[0].offer.type;
  cardElement.querySelector('h4 + p').textContent = randomOffers[0].offer.rooms + randomOffers[0].offer.guests;
  cardElement.querySelector('h4 + p + p').textContent = randomOffers[0].offer.checkin + randomOffers[0].offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(renderFeatures());
  cardElement.querySelector('ul + p').textContent = randomOffers[0].offer.description;
  cardElement.querySelector('.popup__pictures').appendChild(renderPictures());
  return cardElement;
};

var renderFeatures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < randomOffers[0].offer.features.length; i++) {
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + randomOffers[0].offer.features[i];
    fragment.appendChild(newElement);
  }
  return fragment;
};


var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 3; i++) {
    var similarElement = document.querySelector('template').content.querySelector('.popup__pictures li').cloneNode(true);
    similarElement.querySelector('img').setAttribute('src', randomOffers[0].offer.photos[i]);
    similarElement.querySelector('img').setAttribute('height', 60);
    similarElement.querySelector('img').setAttribute('width', 60);
    fragment.appendChild(similarElement);
  }
  return fragment;
};

var cardFragment = document.createDocumentFragment();
cardFragment.appendChild(renderCard(randomOffers[0]));
document.querySelector('.map').insertBefore(cardFragment, document.querySelector('.map__filters-container'));
