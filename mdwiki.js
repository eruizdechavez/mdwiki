#!/usr/bin/env node

var program = require('commander'),
  express = require('express'),
  partials = require('express-partials'),
  http = require('http'),
  path = require('path'),
  marked = require('marked'),
  highlight = require("highlight.js"),
  bunyan = require('bunyan');

program
  .option('-p, --port [port]', 'Port [8080]')
  .parse(process.argv);

marked.setOptions({
  gfm: true,
  langPrefix: 'language-',
  highlight: function (code, lang) {
    lang = lang === 'js' ? 'javascript' : lang;
    return lang ? highlight.highlight(lang, code).value : code;
  }
});

var app = express(),
  log = bunyan.createLogger({
    name: 'mdwiki'
  });

app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.set('port', program.port || 8080);
app.set('path', path.resolve(program.args.shift() || '.'));
app.set('log', log);

app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(partials());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(app.get('path')));

var index = require('./routes/index');
index.initialize(app);

http.createServer(app).listen(app.get('port'), function () {
  log.info('mdwiki running on port ' + app.get('port'));
  log.info('mdwiki serving content at ' + app.get('path'));
});