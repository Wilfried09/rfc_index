function isIndex(){
  let result = false;
  if(window.location.pathname.indexOf('file.html') == -1){
    result= true;
  }
  return result;
}

function redirectFile(link){
  window.location.href = "/file.html?"+link;
}

function resizing(){

  if(isIndex()){
    if(document.getElementById("nav").offsetHeight < window.screen.height){
      console.log("coucou");
      document.getElementById("column-hook").style.height=window.innerHeight+'px';

      let size = window.innerHeight-document.getElementById("headband").offsetHeight;
      document.getElementById("nav").style.height =size+'px';
    }
  }

  if(window.innerWidth <= 768){
    document.getElementById("column-hook").style.width=window.innerWidth+'px';
  }else{
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
  console.log("/createIndex");
  createNav(data.linkFiches);
}

function createFile(data){
  console.log("/createFile");
  createNav(data.linkFiches);
  let result = '';
  let link = window.location.search.replace("?RFC", '');
  switch(link){
    case "1149": link = data.rfc1149;
    break;
    case "2549": link = data.rfc2549;
    break;
    case "6214": link = data.rfc6214;
  }
  document.title = link.tab;
  createHeader(link.header);
  createArticle(link.article);
}

function createNav(data){;
  console.log("/createNav");
  if(isIndex()){
    document.getElementById("navTitle").innerHTML= "<h1>All files</h1>";
    let result = "" ;
    for(var obj in data){
      result = ''+result+"<div onmousedown=";
      if(data[obj].active == false){
        result = ''+result+"><span class='btn unactive' title='Not available'";
      }else{
        result = ''+result+'redirectFile("'+data[obj].link+'");';
        result = ''+result+"><span class='btn btn-link' title='"+data[obj].title+"'";
      }
      result= ''+result+">"+data[obj].name+"</span></div>";

    }
    document.getElementById("buttons").innerHTML=result;
  }else{
    document.getElementById("navTitle").innerHTML= "Related files :";
    let result = "" ;
    for(var obj in data){
      result = ''+result+"<div onmousedown=";
      result = ''+result+'redirectFile("'+data[obj].link+'");';
      result = ''+result+"><span class='btn btn-link'>"+data[obj].name+"</span></div>";
    }
    document.getElementById("buttons").innerHTML=result;
  }
}

function createHeader(data){
  console.log("/createHeader");
  let result = '';
  for(i in data){
    result = ''+result+'<p>'+data[i]+"</p>";
  }
  document.getElementById("header").innerHTML=result;
}

function createPageTitle(data){
  console.log("/createTitle");
  return '<h1>'+data+'</h1>';
}

function createArticle(data){
  console.log("/createArticle");
  let result = createPageTitle(data.title1);
  for(i in data.section){
    if(i != "summary"){
      result= ''+result+'<section>'+createParagraphe(data.section[i])+'</section>';
    }else{
      result= ''+result+'<section>'+createSummary(data.section[i])+'</section>';
    }
  }
  result= ''+result+'<section>'+createAdresse(data.carnetAdresse)+'</section>';
  document.getElementById("content").innerHTML = result;
}

function createParagraphe(data){
  console.log("/createParagraphe");
  let result = '';
  for(i in data){
    result = ''+result+"<h2>"+data[i].title2+"</h2>"+"<p>"+data[i].paragraphe+"</p>";
    if(typeof data[i].pre != "undefined"){
      result = ''+result+"<pre>"+data[i].pre+"</pre>";
    }
  }
  return result;
}

function createSummary(data){
  console.log("/createSummary");
  let result = '';
  result = ''+result+"<h1>"+data.title1+"</h1><ul>";
  for(i in data.ul){
    result = ''+result+"<li>"+data.ul[i].li;
    if(typeof data.ul[i].ul != 'undefined'){
      result = ''+result+"<ul>"+createUnderSummary(data.ul[i].ul)+"</ul>";
    }
    result = ''+result+"</li>";
  }
  result = ''+result+"</ul>";
  return result;
}

function createUnderSummary(data){
  console.log("/createUnderSummary");
  let result = '';
  for(i in data){
    result = ''+result+"<li>"+data[i]+"</li>";
  }
  return result;
}

function createAdresse(data){
  let result = '';
  result = ''+result+'<h1>'+data.title1+'</h1><address>';
  for(i in data.adresse){
    result = ''+result+"<p>"+data.adresse[i]+"</p>";
  }
  result = ''+result+'</address>'
  return result;
}
