'use strict';

(function () {
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
    window.disableFieldsets();
    window.hidePopup();
    window.hidePins();
    document.querySelector('.map').classList.add('map--faded');
    form.classList.add('notice__form--disabled');
  });
})();
