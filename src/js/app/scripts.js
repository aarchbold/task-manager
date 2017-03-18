/* eslint-disable */

// Newsletter Signup Handling
$.fn.handleModal = function(){
  var context = $(this),
    $sliderPin = $('.page-slider--pin', context),
    $sliderAccepted = $('.page-slider--accepted', context),
    $input = $('.pin-input', context),
    $pinButton = $('#pinSubmit', context),
    $acceptedButton = $('#taskAccepted', context),
    $acceptButton = $('#acceptTask', context),
    $overlay = $('.page-overlay'),
    $slider = $('.page-slider');


    $pinButton.click(function(e) {
      e.preventDefault();
      // TODO: make call to endpoint
      $input.val('');
      $slider.removeClass('-is-open');
      $overlay.fadeOut();
    })

    $acceptButton.click(function(e) {
      e.preventDefault();
      $sliderPin.hide();
      $sliderAccepted.show();
      $slider.addClass('-is-open');
      $overlay.fadeIn();
    })

    $acceptedButton.click(function(e) {
      e.preventDefault();
      // TODO: make call to endpoint
      $slider.removeClass('-is-open');
      $overlay.fadeOut();
    })
}


$(function(){
  $('#pending-page').handleModal();
});

