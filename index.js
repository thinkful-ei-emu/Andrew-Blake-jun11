'use strict';
/* global $ */

function getDogImage(num = '1') {
  let requestUrl = 'https://dog.ceo/api/breeds/image/random/' + num;
  fetch(requestUrl)
    .then(response => {
      // console.log(response)
      return response.json();
    })
    .then(responseJson => {
      displayResults(responseJson);
      console.log(responseJson.message);
    })
    .catch(error => alert(`Something went wrong. Try again later. ${error.message}`));
}

function displayResults(responseJson) {
  // console.log(responseJson);
  //replace the existing image with the new one
  $('.results-img').replaceWith(
    `<img src="${responseJson.message[0]}" class="results-img">`
  )
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let dogNum = $('#dog-number').val();
    $('#dog-number').val('');
    // console.log(dogNum, typeof dogNum);
    getDogImage(dogNum);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});