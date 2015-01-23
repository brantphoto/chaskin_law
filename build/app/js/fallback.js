
//JQuery Fallback

if(window.jQuery){
  return;
}else{
   document.write('<script src="app/vendor/jquery.min.js"><\/script>');
}

// Angular Fallback

if(typeof angular == 'undefined'){
  document.write('<script src="app/vendor/angular.min.js"><\/script>');
}

//Bootstrap Fallback

function cssLoaded(href) {
    var cssFound = false;
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheet = document.styleSheets[i];
      if (
        sheet['href'] == "http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" ||
        sheet['href'] == "https://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"
      ) {
        cssFound = true;
      }
    }
    return cssFound;
  }
  if (!cssLoaded('bootstrap.min.css')) {
    local_bootstrap = new CustomEvent('link');
    local_bootstrap.setAttribute("rel", "stylesheet");
    local_bootstrap.setAttribute("href", "app/vendor/bootstrap.min.css");
    document.getElementsByTagName("head")[0].appendChild(local_bootstrap);
    document.write('<script src="app/vendor/bootstrap.min.js"><\/script>')
}

