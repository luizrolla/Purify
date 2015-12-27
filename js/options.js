function get_option_values(optArray) {
  var values = {};
  for (var i = 0; i < optArray.length; i++) {
    if (document.getElementById(optArray[i]).type == "checkbox") {
        values[optArray[i]] = document.getElementById(optArray[i]).checked;
    } else {
        values[optArray[i]] = document.getElementById(optArray[i]).value;
    }

  }
  return values;
}

function set_option_values(options) {
  console.log(options);
  for (var opt in options) {
    if (options.hasOwnProperty(opt)) {
      //boolean values
      if (document.getElementById(opt).type == "checkbox") {
          document.getElementById(opt).checked = options[opt];
      } else {
          document.getElementById(opt).value = options[opt];
      }

    }
  }
}

function save_options() {
  optionObject = get_option_values(["bgColor", "fgColor", "fontSize","bodyFont", "titleFont", "singleColumn",
  "bodyLoadFromGoogle", "titleLoadFromGoogle"]);
  //console.log(bgColor);
  chrome.storage.sync.set(optionObject, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    status.className = "show";
    setTimeout(function() {
      status.className = "";
    }, 1250);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
// Use default value color = 'red' and likesColor = true.
chrome.storage.sync.get({
  bgColor: '#f7f7f7',
  fgColor: '#000000',
  fontSize: "15",
  bodyFont: "Roboto",
  titleFont: "Ubuntu",
  bodyLoadFromGoogle: true,
  titleLoadFromGoogle: true,
  singleColumn: false
}, set_option_values);
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);

  /*document.getElementById('clear').addEventListener('click', function() {
    chrome.storage.sync.clear(function() {
      var status = document.getElementById('status');
      status.textContent = 'Options cleared.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  });*/
