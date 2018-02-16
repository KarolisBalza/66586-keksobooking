'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');

  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mouseup', function (evt) {
    var address = document.querySelector('#address');
    activatePage();
    enableFieldsets();
    showPins();
    setAvailableGuests();
    address.value = (evt.clientX + ', ' + evt.clientY);
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
    popup.classList.add('hidden');
  };

  window.hidePopup();


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

  window.hidePins();

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
})();
