'use strict';

(function () {
  var submitButton = document.querySelector('.form__submit');
  var form = document.querySelector('.notice__form');

  submitButton.addEventListener('click', function (evt) {
    var guestsNumber = document.querySelector('#capacity');
    var selectedIndex = guestsNumber.options['selectedIndex'];
    var invalid = ('Please select valid number of guests.');
    var valid = ('');
    var validation = guestsNumber[selectedIndex].hasAttribute('disabled') ? invalid : valid;
    guestsNumber.setCustomValidity(validation);
    if (!guestsNumber[selectedIndex].hasAttribute('disabled')) {
      window.upload(new FormData(form), successHandler, errorHandler);

      evt.preventDefault();
    }
  });


  var resetForm = document.querySelector('.form__reset');

  resetForm.addEventListener('click', function () {
    window.disableFieldsets();
    window.hidePopup();
    window.hidePins();
    document.querySelector('.map').classList.add('map--faded');
    form.classList.add('notice__form--disabled');
  });


  var successHandler = function () {
    form.reset();
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

})();
