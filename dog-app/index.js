'use strict';
/* global $ */

function getDogImage(num) {
  let requestUrl = 'https://dog.ceo/api/breeds/image/random/' + num;
  fetch(requestUrl)
    .then(response => {
      // console.log(response)
      return response.json();
    })
    .then(responseJson => {
      displayResults(responseJson);
      // console.log(responseJson);
    })
    .catch(error => alert(`Something went wrong. Try again later. ${error.message}`));
}

function getSingleBreed(breedName) {
  let requestUrl = `https://dog.ceo/api/breed/${breedName}/images/random/1`;
  fetch(requestUrl)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      displayResults(responseJson);
    })
    .catch(error => alert('breed not on database'));
}


function displayResults(responseJson) {
  // console.log(responseJson);
  //replace the existing image with the new ones
  let images = '';
  responseJson.message.forEach((image) => {
    images += `<img src="${image}" class="results-img">`;
  }); 

  $('.results-img').html(
    images
  );
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('#many-dogs').submit(event => {
    event.preventDefault();
    let dogNum = ($('#dog-number').val() > 0 && $('#dog-number').val() < 51) ? $('#dog-number').val() : '3';
    $('#dog-number').val('');
    // console.log(dogNum, typeof dogNum);
    getDogImage(dogNum);
  });
  $('#single-breed').submit(event => {
    event.preventDefault();
    let breedName = $('#breed-name').val();
    $('#breed-name').val('');
    // console.log(dogNum, typeof dogNum);
    getSingleBreed(breedName);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});