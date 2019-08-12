$(document).ready(function() {
  var script_name = deSnakeCasify(getUrlParameter("key"));
  $('#field_name').val(script_name);
  chrome.storage.sync.get(script_name, function(result) {
    $('#field_script').val(result[script_name].script);
    $('.label-item-'+result[script_name].label).addClass('label-active');
  });

  $('.label-item').on('click', function() {
    activateLabel($(this));
  });

  $('#update_button').on('click', function() {
    var script_name = deSnakeCasify(getUrlParameter("key"));
    if(validate_name.validate($('#field_name').val()) === false) {
      $('#field_script').next('p').text("");
      $('#field_name').next('p').text(validate_name.message);
    } else {
      if(validate_script.validate($('#field_script').val()) === false) {
        $('#field_name').next('p').text("");
        $('#field_script').next('p').text(validate_script.message);
      } else {
        chrome.storage.sync.remove(script_name);
        saveEntry($('#field_name').val(), $('#field_script').val(), $('.label-active').attr("rel"));
      }
    }
  });
});
