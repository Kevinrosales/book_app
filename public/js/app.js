'use strict';

$('button').on('click', e => {
  console.log('clicked');
  console.log(e.target.id);
  location.href =`/details/${e.target.id}`;
//   $.get(`/modify/${e.target.id}`);
});
