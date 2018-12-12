function resizing(){
  document.getElementById("column-hook").style.height=window.innerHeight+'px';
}

function errors(data){
  console.log('Erreur')
  console.log(data)


}
function success(data) {
  console.log("Success !");
  createNav(data);
  createFiche(data);
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
    xhr.open("GET", path, true);
    xhr.send();
}

function createNav(data){;
  let result = "" ;
  var nav = data.index.linkFiches;
  console.log("nav : "+nav);
  for(var obj in nav){
    console.log(nav[obj]);
    result = ''+result+"<a href='"+nav[obj].link+"'><span class='btn btn-link'>"+nav[obj].name+"</span></a>";
  }
  console.log(result);
  document.getElementById("nav").innerHTML=result;
}

function createFiche(data){
  console.log(data);
}
