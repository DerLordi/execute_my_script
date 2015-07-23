$(document).ready(function() {
  chrome.tabs.executeScript(null, {file: "jquery.min.js"});

  chrome.storage.sync.get(null, function(data) {
    for(var script_key in data) {
      var obj = data[script_key];
      createButton(script_key, obj.label);
    }

    $('.editable').hide();

    $('#button_container button').on('click', function() {
      var key = $(this).attr("id").replace(/_/g," ");
      chrome.storage.sync.get(key, function(data) {
        chrome.tabs.executeScript({ code: data[key].script });
      });
    });

    $('#button_container .loeschen').on('click', function() {
      var key = $(this).attr("rel");
      chrome.storage.sync.remove(key);
      $('.'+snakeCasify(key)).hide('fast');
    });
  });

  $('#edit_script').on('click', function() {
    if ($(this).attr("rel") == "false") {
      $('.editable').show();
      $(this).attr("rel", "true");
      $(this).find('.editMode').text("Off");
      $(this).css("background-color", "#7ef49d");
    } else {
      $('.editable').hide();
      $(this).attr("rel", "false");
      $(this).find('.editMode').text("On");
      $(this).css("background-color", "#52b159");
    }
  });
});
