function resizing(){
  document.getElementById("column-hook").style.height=window.innerHeight+'px';
}

function getJSON(){
  alert("I'm in !");
  var requestURL = './JSON/fiche.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var jsonObj = request.response;
    alert(jsonObj);
  }
}
