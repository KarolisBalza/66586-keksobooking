'use strict';

(function () {
  var MAIN_PIN_DEFAULT_LEFT = 50; // %
  var MAIN_PIN_DEFAULT_TOP = 375; // px
  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var submitButton = form.querySelector('.form__submit');
  var resetForm = form.querySelector('.form__reset');
  var mainPin = map.querySelector('.map__pin--main');
  var uploadURL = 'https://js.dump.academy/keksobooking';

  submitButton.addEventListener('click', function (evt) {
    if (isGuestsNumberValid() && isTitleValid() && isPriceValid()) {
      window.setup('POST', new FormData(form), successHandler, errorHandler, uploadURL);
      evt.preventDefault();
    }
  });

  var isTitleValid = function () {
    var title = form.querySelector('#title');
    var isValid = title.value.length >= title.minLength;
    return isValid;
  };

  var isPriceValid = function () {
    var price = form.querySelector('#price');
    var isValid = parseInt(price.min, 10) <= parseInt(price.value, 10) && parseInt(price.value, 10) <= parseInt(price.max, 10);
    return isValid;
  };

  var isGuestsNumberValid = function () {
    var guestsNumber = form.querySelector('#capacity');
    var selectedIndex = guestsNumber.options['selectedIndex'];
    var invalid = ('Please select valid number of guests.');
    var valid = ('');
    var isValid = !guestsNumber[selectedIndex].hasAttribute('disabled');
    var validation = isValid ? valid : invalid;
    guestsNumber.setCustomValidity(validation);
    return isValid;
  };


  resetForm.addEventListener('click', function () {
    window.disableFieldsets();
    window.hidePopup();
    window.hidePins();
    document.querySelector('.map').classList.add('map--faded');
    form.classList.add('notice__form--disabled');
  });


  var successHandler = function () {
    form.reset();
    mainPin.setAttribute('style', 'left: ' + MAIN_PIN_DEFAULT_LEFT + '%; ' + 'top:' + MAIN_PIN_DEFAULT_TOP + 'px');
    window.hidePins();
    window.hidePopup();
    deactivatePage();
    window.setAddress();
  };

  var errorHandler = function (response) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; width: 960px; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = response;
    document.querySelector('.notice').appendChild(node);
  };

  var deactivatePage = function () {
    map.classList.add('map--faded');
  };

})();
