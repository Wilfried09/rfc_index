function resizing(){
  console.log("Oww ça bouge !");
  document.getElementById("column-hook").style.height=window.innerHeight+'px';
  if(window.innerWidth <= 768){
    console.log("Oww ça tangue !");
    document.getElementById("column-hook").style.width=window.innerWidth+'px';
  }else{
      document.getElementById("column-hook").style.width='60%';
  }
}

function errors(data){
  console.log('Error !')
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
  var nav = data.fiches.linkFiches;
  for(var obj in nav){
    result = ''+result+"<a href='"+nav[obj].link+"'><span class='btn btn-link'>"+nav[obj].name+"</span></a>";
  }
  document.getElementById("nav").innerHTML=result;
}

function createFiche(data){
  console.log(data);
}
