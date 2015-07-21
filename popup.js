$(document).ready(function() {
  chrome.tabs.executeScript(null, {file: "jquery.min.js"});

  $('#fillForm').click(function() {
    chrome.tabs.executeScript(null, {file: "scripts/fill_form.js"});
  });

  $('#fillFormAndProceed').click(function() {
    chrome.tabs.executeScript(null, {file: "scripts/fill_form_and_proceed.js"});
  });
});
