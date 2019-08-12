function snakeCasify(val) {
  return val.replace(/ /g,"_");
}

function deSnakeCasify(val) {
  return val.replace(/_/g," ");
}

function createButton(name, label) {
  var div_container = $('<div></div>').addClass(snakeCasify(name)).attr("rel", label);
  var deleteButton = $('<a href="#" class="editable loeschen"><img src="../images/bin.png"/></a>').attr("rel", name);
  var editButton = $('<a href="edit.html?key='+snakeCasify(name.trim())+'" class="editable edit"><img src="../images/pen.png"/></a>').attr("rel", name);
  var label = $('<div></div>').addClass('label label-item-'+label);
  var button = $('<button></button>')
    .attr("id", snakeCasify(name))
    .addClass('script_buttons script_buttons_red')
    .text(name);

  div_container.appendTo($('#button_container'));
  button.appendTo(div_container);
  label.appendTo(button);
  deleteButton.appendTo(div_container);
  editButton.appendTo(div_container);
}

function getUrlParameter(sParam)
{
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++)
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam)
    {
        return sParameterName[1];
    }
  }
}

var validate_name = {
    validate: function (val) {
        return (val.match(/^[A-Za-z\s\d]+$/) ? true : false );
    },
    message: "ERROR: Has to be filled (only alphanumeric characters)."
}

var validate_script = {
    validate: function(val) {
      return (val.length === 0) ? false : true;
    },
    message: "ERROR: Has to be filled"
}

function saveEntry(script_name, script_value, script_label) {
  var storage = chrome.storage.local
  var obj = {};

  if (!script_name || !script_value) {
      alert("es ist ein fehler aufgetreten, beide Felder müssen gefüllt sein!");
    return;
  }
  obj[script_name] = {script: script_value, label: script_label };
  chrome.storage.sync.set(obj, function() {
    window.location.href = "popup.html";
  });
}

function show_all_buttons() {
  $('#button_container > div').show();
}

function filter_buttons(label) {
  $('#button_container > div').each(function() {
    ($(this).attr("rel") == label) ? $(this).show() : $(this).hide();
    if(label == "clear") {
      show_all_buttons();
    }
  });
}

function activateLabel(label) {
  $('.label-item').each(function() {
    if($(this).attr("class") == label.attr("class")) {
      $(this).addClass('label-active');
    } else {
      $(this).removeClass('label-active');
    }
  });
}
