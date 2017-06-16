var express = require('express');
var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, '/public')));

// views is directory for all our template files
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

// controllers is a directory for all our routes
app.use(require(path.join(__dirname, '/app/controllers')))

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
