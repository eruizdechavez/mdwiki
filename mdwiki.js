#!/usr/bin/env node

var program = require('commander'),
  express = require('express'),
  partials = require('express-partials'),
  http = require('http'),
  path = require('path'),
  marked = require('marked'),
  highlight = require("highlight.js"),
  bunyan = require('bunyan'),
  fs = require('fs');


program
  .option('-p, --port [port]', 'Port [8080]')
  .option('-W, --no-watch', 'Disable folder watch (Browser autoreload)')
  .parse(process.argv);

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
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

app.set('views', __dirname + '/views')
  .set('view engine', 'hjs')
  .set('port', program.port || 8080)
  .set('path', path.resolve(program.args.shift() || '.'))
  .set('log', log)
  .use(express.favicon())
  .use(express.bodyParser())
  .use(express.methodOverride())
  .use(partials())
  .use(app.router)
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(app.get('path')));

var index = require('./routes/index');
index.initialize(app);

var server = http.createServer(app);

if (program.watch) {
  var io = require('socket.io').listen(server);
}

server.listen(app.get('port'), function () {
  log.info('mdwiki running on port ' + app.get('port'));
  log.info('mdwiki serving content at ' + app.get('path'));
});

if (program.watch) {
  io.sockets.on('connection', function (socket) {
    fs.watch(app.get('path'), function (event, filename) {
      socket.emit('watch', { event: event, filename: filename });
    });
  });
}