'use strict';
var ESC_KEYCODE = 27;
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

var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mouseup', function (evt) {
  var address = document.querySelector('#address');
  activatePage();
  enableFieldsets();
  showPins();
  address.value = (evt.clientX + ', ' + evt.clientY);
});

var disableFieldsets = function () {
  var fieldsets = document.querySelectorAll('.notice__form fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', true);
  }
};

var enableFieldsets = function () {
  var form = document.querySelector('.notice__form');
  var fieldsets = form.querySelectorAll('.notice__form fieldset');
  form.classList.remove('notice__form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
};

disableFieldsets();

var activatePage = function () {
  map.classList.remove('map--faded');
};

var map = document.querySelector('.map');

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
    element.setAttribute('pin-number', i);
    fragment.appendChild(element);
  }
  template.appendChild(fragment);
};

renderPins();


var renderCard = function (offerNumber) {
  var similarCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('img').setAttribute('src', randomOffers[offerNumber].author.avatar);
  cardElement.querySelector('h3').textContent = randomOffers[offerNumber].offer.title;
  cardElement.querySelector('p small').textContent = randomOffers[offerNumber].offer.address;
  cardElement.querySelector('.popup__price').textContent = randomOffers[offerNumber].offer.price;
  cardElement.querySelector('h4').textContent = randomOffers[offerNumber].offer.type;
  cardElement.querySelector('h4 + p').textContent = randomOffers[offerNumber].offer.rooms + randomOffers[offerNumber].offer.guests;
  cardElement.querySelector('h4 + p + p').textContent = randomOffers[offerNumber].offer.checkin + randomOffers[offerNumber].offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(renderFeatures(offerNumber));
  cardElement.querySelector('ul + p').textContent = randomOffers[offerNumber].offer.description;
  cardElement.querySelector('.popup__pictures').appendChild(renderPictures(offerNumber));
  return cardElement;
};

var renderFeatures = function (offerNumber) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < randomOffers[offerNumber].offer.features.length; i++) {
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + randomOffers[offerNumber].offer.features[i];
    fragment.appendChild(newElement);
  }
  return fragment;
};


var renderPictures = function (offerNumber) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 3; i++) {
    var similarElement = document.querySelector('template').content.querySelector('.popup__pictures li').cloneNode(true);
    similarElement.querySelector('img').setAttribute('src', randomOffers[offerNumber].offer.photos[i]);
    similarElement.querySelector('img').setAttribute('height', 60);
    similarElement.querySelector('img').setAttribute('width', 60);
    fragment.appendChild(similarElement);
  }
  return fragment;
};

var showPinInfo = function (offerNumber) {
  var mapCard = document.querySelector('.map__card');
  if (map.contains(mapCard)) {
    mapCard.remove();
  }
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(renderCard(offerNumber));
  map.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
};

showPinInfo(0);

var allPins = document.querySelector('.map__pins');

allPins.addEventListener('click', function (evt) {
  if (evt.path[1].hasAttribute('pin-number')) {
    showPinInfo(evt.path[1].getAttribute('pin-number'));
  }
});

var hidePopup = function () {
  var popup = document.querySelector('.map__card');
  popup.classList.add('hidden');
};

hidePopup();


var hidePins = function () {
  var pins = document.querySelectorAll('.map__pin');
  for (var i = 0; i < pins.length; i++) {
    if (!pins[i].classList.contains('map__pin--main')) {
      pins[i].classList.add('hidden');
    }
  }
};

var showPins = function () {
  var pins = document.querySelectorAll('.map__pin');
  for (var i = 0; i < pins.length; i++) {
    if (!pins[i].classList.contains('map__pin--main')) {
      pins[i].classList.remove('hidden');
    }
  }
};

hidePins();

map.addEventListener('click', function (evt) {
  document.querySelector('popup__close');
  if (evt.target.classList.contains('popup__close')) {
    hidePopup();
  }
});

map.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hidePopup();
  }
});

var homeType = document.querySelector('#type');

homeType.addEventListener('change', function () {
  var homePrice = document.querySelector('#price');
  switch (homeType.value) {
    case 'flat':
      homePrice.setAttribute('min', 1000);
      break;
    case 'bungalo':
      homePrice.setAttribute('min', 0);
      break;
    case 'house':
      homePrice.setAttribute('min', 5000);
      break;
    case 'palace':
      homePrice.setAttribute('min', 10000);
      break;
  }
});

var roomNumber = document.querySelector('#room_number');

roomNumber.addEventListener('change', function () {
  var capacity = document.querySelector('#capacity');
  var threeGuests = capacity[0];
  var twoGuests = capacity[1];
  var oneGuest = capacity[2];
  var notForGuests = capacity[3];
  switch (roomNumber.value) {
    case '1':
      threeGuests.setAttribute('disabled', true);
      twoGuests.setAttribute('disabled', true);
      oneGuest.removeAttribute('disabled');
      notForGuests.setAttribute('disabled', true);

      break;
    case '2':
      threeGuests.setAttribute('disabled', true);
      twoGuests.removeAttribute('disabled');
      oneGuest.removeAttribute('disabled');
      notForGuests.setAttribute('disabled', true);
      break;
    case '3':
      threeGuests.removeAttribute('disabled');
      twoGuests.removeAttribute('disabled');
      oneGuest.removeAttribute('disabled');
      notForGuests.setAttribute('disabled', true);
      break;
    case '100':
      threeGuests.setAttribute('disabled', true);
      twoGuests.setAttribute('disabled', true);
      oneGuest.setAttribute('disabled', true);
      notForGuests.removeAttribute('disabled');
      break;
  }
});

var checkinTime = document.querySelector('#timein');
checkinTime.addEventListener('change', function () {
  checkinTime = document.querySelector('#timein');
  switch (checkinTime.value) {
    case '12:00':
      checkoutTime.selectedIndex = 0;
      break;
    case '13:00':
      checkoutTime.selectedIndex = 1;
      break;
    case '14:00':
      checkoutTime.selectedIndex = 2;
      break;
  }
});

var checkoutTime = document.querySelector('#timeout');
checkoutTime.addEventListener('change', function () {
  switch (checkoutTime.value) {
    case '12:00':
      checkinTime.selectedIndex = 0;
      break;
    case '13:00':
      checkinTime.selectedIndex = 1;
      break;
    case '14:00':
      checkinTime.selectedIndex = 2;
      break;
  }
});

var capacity = document.querySelector('#capacity');
capacity.addEventListener('change', function () {
  capacity.setCustomValidity('');
});

var submitButton = document.querySelector('.form__submit');

submitButton.addEventListener('click', function () {
  var guestsNumber = document.querySelector('#capacity');
  var selectedIndex = guestsNumber.options['selectedIndex'];
  if (guestsNumber[selectedIndex].hasAttribute('disabled')) {
    guestsNumber.setCustomValidity('Please select valid number of guests.');
  } else {
    guestsNumber.setCustomValidity('');
  }
});

var resetForm = document.querySelector('.form__reset');

resetForm.addEventListener('click', function () {
  var form = document.querySelector('.notice__form');
  disableFieldsets();
  hidePopup();
  hidePins();
  map.classList.add('map--faded');
  form.classList.add('notice__form--disabled');
});
