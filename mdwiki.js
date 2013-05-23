#!/usr/bin/env node

var program = require('commander');
program
  .option('-p, --port [port]', 'Port [8080]')
  .parse(process.argv);

var express = require('express'),
  partials = require('express-partials'),
  http = require('http'),
  path = require('path'),
  bunyan = require('bunyan');

var app = express(),
  log = app.log = bunyan.createLogger({
    name: 'mdwiki'
  }),
  _path = path.resolve(program.args.shift() || '.');

app.set('port', program.port || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(partials());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(_path));

app.get('/', function (req, res) {
  res.render('index.hjs');
});

http.createServer(app).listen(app.get('port'), function () {
  log.info('mdwiki running on port ' + app.get('port'));
  log.info('mdwiki serving content at ' + _path);
});