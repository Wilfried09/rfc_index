function isIndex(){
  let result = false;
  if(window.location.pathname.indexOf('Files') == -1){
    result= true;
  }
  return result;
}

function resizing(){

  if(isIndex()){
    console.log("Resize hauteur");
    document.getElementById("column-hook").style.height=window.innerHeight+'px';
  }

  if(window.innerWidth <= 768){
    console.log("Resize page");
    document.getElementById("column-hook").style.width=window.innerWidth+'px';
  }else{
    console.log("Resize colonne");
    document.getElementById("column-hook").style.width='60%';
  }
}

function getJSON(path){
    var xhr = new XMLHttpRequest();
    xhr.resquestType ='json';
    xhr.open("GET", path, true);
    xhr.onload = function(){
       var result = JSON.parse(xhr.response);
       checkPage(result);
    }
    xhr.send(null);
}


function checkPage(data){
  if (typeof data == 'undefined') {
   getJSON('../JSON/fiche.json');
  } else {
    if(isIndex()){
      createIndex(data.index);
    }else{
      createFile(data.fiches);
    }
  }
}

function createIndex(data){
  console.log("Creating Index");
  createNav(data.linkFiches);
}

function createFile(data){
  console.log("Creating File");
  createNav(data.linkFiches);
  createHeader(data.rfc1149.header);
  createArticle(data.rfc1149.article);
}

function createNav(data){;
  console.log("Creating Nav");
  let result = "" ;
  for(var obj in data){
    result = ''+result+"<a href='"+data[obj].link+"'><span class='btn btn-link'>"+data[obj].name+"</span></a>";
  }
  document.getElementById("nav").innerHTML=result;
}

function createHeader(data){
  let result = '';
  for(i in data){
    result = ''+result+'<p>'+data[i]+"</p>";
  }
  document.getElementById("header").innerHTML=result;
}

function createPageTitle(data){
  return '<h1>'+data+'</h1>';
}

function createArticle(data){
  let result = createPageTitle(data.title);
  for(i in data.section){
    result= ''+result+'<section>'+createParagraphe(data.section[i])+'</section>';
  }
  result= ''+result+'<section>'+createAdresse(data.carnetAdresse)+'</section>';
  document.getElementById("content").innerHTML = result;
}

function createParagraphe(data){
  let result = '';
  for(i in data){
    result = ''+result+"<h2>"+data[i].title2+"</h2>"+"<p>"+data[i].paragraphe+"</p>";
    console.log(data[i].pre);
    if(data[i].pre != "undefined"){
      result = ''+result+"<pre>"+data[i].pre+"</pre>";
    }
  }
  return result;
}

function createAdresse(data){
  let result = '';
  result = ''+result+'<h2>'+data.title+'</h2><address>';
  for(i in data.adresse){
    result = ''+result+"<p>"+data.adresse[i]+"</p>";
  }
  result = ''+result+'</address>'
  return result;
}
