var express = require('express');
var app     = express();
var path    = require('path');


// public folder to server static assets
app.use(express.static(__dirname + '/build'));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8080);
console.log('server running on 8080');