var express = require('express'),
  partials = require('express-partials'),
  http = require('http'),
  path = require('path'),
  bunyan = require('bunyan');

var app = express(),
  log = bunyan.createLogger({
    name: 'mdwiki'
  });

app.log = log;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(partials());
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function () {
  log.info('Express server listening on port ' + app.get('port'));
});