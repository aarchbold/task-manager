/* eslint-disable */
// globes
var taskState = 'pending';

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
    $slider = $('.page-slider'),
    $mainSection = $('#mainSection'),
    $taskHeading = $('.main-navigation__header'),
    $todos = $('.body-content_bullet'),
    $footerPending = $('.main-footer__container.-pending'),
    $footerAccepted = $('.main-footer__container.-accepted');

    function setState(state) {
      if (state === 'accepted') {
        console.log($mainSection);
        $mainSection.addClass('section-accepted');
        $mainSection.removeClass('section-pending');
        $todos.each(function(i,e){
          console.log(e);
          $(this).addClass('-indent');
          $('.radio-button', $(this)).fadeIn();
        });
        $footerPending.hide();
        $footerAccepted.show();
        $taskHeading.html('TASK IN PROGRESS');
      }
    }

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
      taskState = 'accepted';
      setState(taskState);
      $slider.removeClass('-is-open');
      $overlay.fadeOut();
    })

    // show pending footer
    $footerPending.fadeIn();
}


$(function(){
  $('#pending-page').handleModal();
});

