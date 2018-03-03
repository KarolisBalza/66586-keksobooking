'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.notice__photo input[type=file]');
  var avatarPreview = document.querySelector('.notice__preview img');
  var imagesChooser = document.querySelector('.form__photo-container input[type=file]');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

  });


  imagesChooser.addEventListener('change', function () {
    var file = imagesChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var imgContainer = document.querySelector('.form__photo');
      var newList = document.createElement('li');
      var newImg = new Image(100, 100);

      newList.classList.add('sortable__item');
      newImg.classList.add('sortable__pic');

      newList.appendChild(newImg);
      imgContainer.appendChild(newList);

      var reader = new FileReader();

      reader.addEventListener('load', function () {
        newImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
