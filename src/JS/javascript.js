function resizing(){
  document.getElementById("column-hook").style.height=window.innerHeight+'px';
}

function getJSON(path, success, error){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success){
                  success(JSON.parse(xhr.responseText));
                }
            } else {
                if (error){
                  error(xhr);
                }
            }
        }
    };
    xhr.open("GET", Chrome.extension.getURL(path), true);
    xhr.send();
}
