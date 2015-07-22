function snakeCasify(val) {
  return val.replace(/ /g,"_");
}

function deSnakeCasify(val) {
  return val.replace(/_/g," ");
}

function createButton(name) {
  var div_container = $('<div></div>').addClass(snakeCasify(name));
  var deleteButton = $('<a href="#" class="editable loeschen"><img src="images/bin.png"/></a>').attr("rel", name);
  var editButton = $('<a href="edit.html?key='+snakeCasify(name.trim())+'" class="editable edit"><img src="images/pen.png"/></a>').attr("rel", name);
  var button = $('<button></button>')
    .attr("id", snakeCasify(name))
    .addClass('script_buttons script_buttons_red')
    .text(name);

  div_container.appendTo($('#button_container'));
  button.appendTo(div_container);
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

function saveEntry(script_name, script_value) {
  var storage = chrome.storage.local
  var obj = {};

  if (!script_name || !script_value) {
    alert("es ist ein fehler aufgetreten, beide Felder müssen gefüllt sein!");
    return;
  }
  obj[script_name] = script_value;
  chrome.storage.sync.set(obj, function() {
    window.location.href = "popup.html";
  });
}