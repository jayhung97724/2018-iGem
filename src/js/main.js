$(document).ready(function () {
  $('#openSidebar').on("click", function (e) {
    e.preventDefault();
    $('#sidemenu').toggle();
    $('body, html').animate({
      scrollTop: 0                       // Scroll to top of body
    }, 500);
  });
  $('.ui.dropdown').dropdown()
});