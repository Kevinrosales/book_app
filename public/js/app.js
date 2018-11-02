'use strict';

$('document').ready(() => {

  $('#edit').on('click', displayForm);
  $('button[class]').on('click', displayForm);

  function displayForm(e) {
    if (e.target.className){
      $(`section[class="${e.target.className}"]`).toggleClass('hidden');
      $(`button[class="${e.target.className}"]`).toggleClass('hidden');
      $(`form[class*="${e.target.className}"]`).toggleClass('hidden');
    }
    else{
      $('section').toggleClass('hidden');
      $('#edit').toggleClass('hidden');
      $('form').toggleClass('hidden');
    }
  }


})

