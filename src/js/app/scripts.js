/* eslint-disable */
// globes
window.workbert = {
  taskState: 'pending'
};

// Newsletter Signup Handling
$.fn.handleModal = function(){
  var context = $(this),
    $sliderPin = $('.page-slider--pin', context),
    $sliderAccepted = $('.page-slider--accepted', context),
    $sliderUpdate = $('.page-slider--progress', context),
    $input = $('.pin-input', context),
    $pinButton = $('#pinSubmit', context),
    $acceptedButton = $('#taskAccepted', context),
    $acceptButton = $('#acceptTask', context),
    $doneButton = $('#finishTask', context),
    $closeButton = $('.page-slider_close-button', context),
    $updateButton = $('#updateTask', context),
    $overlay = $('.page-overlay'),
    $slider = $('.page-slider'),
    $mainSection = $('#mainSection'),
    $taskHeading = $('.main-navigation__header'),
    $todos = $('.body-content_bullet'),
    $footerPending = $('.main-footer__container.-pending'),
    $footerAccepted = $('.main-footer__container.-accepted');

    function showRadialProgress() {
      var transform_styles = ['-webkit-transform','-ms-transform','transform'];
      
      window.randomize = function() {
        $('.progress-radial').attr('data-progress', Math.floor(Math.random() * 100));
      };

      setTimeout(window.randomize, 200);
      $('.progress-radial').click(window.randomize);
    }

    function setState(state) {
      if (state === 'accepted') {
        window.workbert.taskState = 'accepted';
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
      } else if (state === 'completed') {
        window.workbert.taskState = 'completed';
        $mainSection.addClass('section-completed');
        $mainSection.removeClass('section-accepted');
        $doneButton.addClass('button--completed');
        $todos.each(function(i,e){
          $('.radio-button', $(this)).addClass('-selected');
        });
      }
    }

    $pinButton.click(function(e) {
      e.preventDefault();
      // TODO: make call to endpoint
      $input.val('');
      $slider.removeClass('-is-open');
      $overlay.fadeOut();
      context.removeClass('-lock');
    })

    $acceptButton.click(function(e) {
      e.preventDefault();
      $sliderPin.hide();
      $sliderAccepted.show();
      $slider.addClass('-is-open');
      $overlay.fadeIn();
      context.addClass('-lock');
    })

    $updateButton.click(function(e) {
      e.preventDefault();
      $sliderPin.hide();
      $sliderAccepted.hide();
      $sliderUpdate.show();
      $slider.addClass('-is-open');
      $overlay.fadeIn();
      context.addClass('-lock');
    })

    $closeButton.click(function(e) {
      e.preventDefault();
      $slider.removeClass('-is-open');
      $overlay.fadeOut();
      context.removeClass('-lock');
    })

    $acceptedButton.click(function(e) {
      e.preventDefault();
      // TODO: make call to endpoint
      setState('accepted');
      $slider.removeClass('-is-open');
      $overlay.fadeOut();
      context.removeClass('-lock');
    })

    $doneButton.click(function(e) {
      e.preventDefault();
      setState('completed');
    })

    // show pending footer
    $footerPending.fadeIn();
    // set up radial progress bar
    showRadialProgress();
}


$(function(){
  $('#pending-page').handleModal();
});

