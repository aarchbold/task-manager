/* eslint-disable */
// globes
window.workbert = {
  taskState: 'pending',
  tasksDone: 1,
  tasksTotal: 4,
  progress: '25%'
};

// Newsletter Signup Handling
$.fn.handleModal = function() {
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
      $overlay.fadeOut(400, function() {
        $sliderUpdate.hide();
      });
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
}

$.fn.handleProgress = function() {
  var context = $(this),
    $percentage = $('.percentage',context),
    $increase = $('.page-slider_radial-controls_button.-increase',context),
    $decrease = $('.page-slider_radial-controls_button.-decrease',context),
    $progress = $('.progress-radial', context),
    multiplier = 25;

  console.log(context);
  console.log($percentage);
  console.log($increase);
  console.log($decrease);
  console.log($progress);

  $increase.click(function(e) {
    e.preventDefault();
    var curProgress = $progress.attr('data-progress');
    var curProgressInt = parseInt(curProgress,10);
    if (curProgressInt < 100) {
      curProgressInt = curProgressInt + multiplier;
      if (curProgressInt > 99) {
        $progress.attr('data-progress', '100');
      } else {
        $progress.attr('data-progress', curProgressInt);
      }
      $percentage.html($progress.attr('data-progress') + '%');
    }
  })
  $decrease.click(function(e) {
    e.preventDefault();
    var curProgress = $progress.attr('data-progress');
    var curProgressInt = parseInt(curProgress,10);
    if (curProgressInt > 0) {
      curProgressInt = curProgressInt - multiplier;
      if (curProgressInt < 1) {
        $progress.attr('data-progress', '0');
      } else {
        $progress.attr('data-progress', curProgressInt);
      }
      $percentage.html($progress.attr('data-progress') + '%');
    }
  })

}

$(function(){
  $('#pending-page').handleModal();
  $('#radialProgress').handleProgress();
});

