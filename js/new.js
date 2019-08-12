$(document).ready(function() {
  $('.label-item').on('click', function() {
    activateLabel($(this));
  });

  $('#save_button').click(function() {
    if(validate_name.validate($('#field_name').val()) === false) {
      $('#field_script').next('p').text("");
      $('#field_name').next('p').text(validate_name.message);
    } else {
      if(validate_script.validate($('#field_script').val()) === false) {
        $('#field_name').next('p').text("");
        $('#field_script').next('p').text(validate_script.message);
      } else {
        saveEntry($('#field_name').val(), $('#field_script').val(), $('.label-active').attr("rel"));
      }
    }
  });
});
