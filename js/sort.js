'use strict';

(function () {

  var photoList = document.querySelector('.form__photo');

  photoList.addEventListener('dragstart', function (e) {
    var randomId = 'id' + Math.round(Math.random() * 100);
    e.target.parentNode.id = randomId;

    e.dataTransfer.setData('text/plain', e.target.outerHTML);
    e.dataTransfer.setData('id', e.target.parentNode.id);
  });

  photoList.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  photoList.addEventListener('drop', function (e) {
    var data = e.dataTransfer.getData('text/plain');
    var draggedItemId = e.dataTransfer.getData('id');
    var newListItem = document.createElement('li');
    var draggedItem = document.querySelector('#' + draggedItemId);
    newListItem.classList.add('sortable__item');
    newListItem.innerHTML = data;
    if (e.target.matches('li')) {
      photoList.insertBefore(newListItem, e.target);
      draggedItem.remove();
    }
    if (e.target.matches('ul')) {
      photoList.appendChild(newListItem);
      draggedItem.remove();
    }
  });

})();
