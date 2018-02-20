'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var MAIN_PIN_WIDTH = 50;
  var MAIN_PIN_HEIGHT = 84;
  var TOP_BORDER = 60;
  var BOTTOM_BORDER = 660;
  var LEFT_BORDER = 0;
  var RIGHT_BORDER = 1200;

  window.offers = [];

  var map = document.querySelector('.map');

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop - shift.y >= BOTTOM_BORDER) {
        mainPin.style.top = BOTTOM_BORDER + 'px';
      }
      if (mainPin.offsetTop - shift.y <= TOP_BORDER) {
        mainPin.style.top = TOP_BORDER + 'px';
      }
      if (mainPin.offsetLeft - shift.x <= LEFT_BORDER) {
        mainPin.style.left = LEFT_BORDER + 'px';
      }
      if (mainPin.offsetLeft - shift.x >= RIGHT_BORDER) {
        mainPin.style.left = RIGHT_BORDER + 'px';
      }

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('mouseup', function () {
    var address = document.querySelector('#address');
    window.load(successHandler, errorHandler);
    activatePage();
    enableFieldsets();
    showPins();
    setAvailableGuests();
    address.value = ((mainPin.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + (mainPin.offsetTop + MAIN_PIN_HEIGHT));
  });

  window.disableFieldsets = function () {
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

  window.disableFieldsets();

  var activatePage = function () {
    map.classList.remove('map--faded');
  };

  var removeActive = function () {
    var pinsArray = allPins.querySelectorAll('.map__pin');
    for (var i = 0; i < allPins.querySelectorAll('.map__pin').length; i++) {
      if (pinsArray[i].classList.contains('active')) {
        pinsArray[i].classList.remove('active');
      }
    }
  };


  var allPins = document.querySelector('.map__pins');

  allPins.addEventListener('click', function (evt) {
    if (evt.path[1].hasAttribute('pin-number')) {
      removeActive();
      evt.path[1].classList.add('active');
      window.showPinInfo(evt.path[1].getAttribute('pin-number'));
    }
  });

  window.hidePopup = function () {
    var popup = document.querySelector('.map__card');
    if (map.contains(popup)) {
      popup.classList.add('hidden');
    }
  };


  window.hidePins = function () {
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


  map.addEventListener('click', function (evt) {
    document.querySelector('popup__close');
    if (evt.target.classList.contains('popup__close')) {
      window.hidePopup();
      removeActive();
    }
  });

  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.hidePopup();
      removeActive();
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
    setAvailableGuests();
  });

  var setAvailableGuests = function () {
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
  };

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

  var successHandler = function (offersArray) {
    window.offers = offersArray;
    window.renderPins();
  };

  var errorHandler = function (response) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; width: 1200px; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = response;
    document.querySelector('.map').appendChild(node);
  };


})();
