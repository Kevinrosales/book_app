'use strict';

$('#edit').on('click', displayForm)

function displayForm() {
    // console.log('hello');
  $('section').toggleClass('hidden');
  $('#edit').toggleClass('hidden');
  $('form').toggleClass('hidden');
}
