var marked = require('marked'),
  path = require('path'),
  fs = require('fs'),
  log = null;

exports.initialize = function (app) {
  log = app.get('log');

  app.get('/', exports.list, exports.index);
  app.get(/(.+)\/$/, exports.list, exports.index);
  app.get(/((.+)\.md$)/i, exports.list, exports.md);
};

exports.list = function (req, res, next) {
  var _path = path.join(req.app.get('path'), decodeURIComponent(req.url)),
    stats = fs.statSync(_path),
    cwd, content, dirs, files;

  if (!stats.isDirectory()) {
    cwd = path.dirname(_path);
  } else {
    cwd = _path;
  }

  content = fs.readdirSync(cwd);

  files = content.filter(function (item) {
    if (req.url[req.url.length - 1] === '/' && path.basename(item).toLowerCase() === 'readme.md') {
      return res.redirect(req.url + item);
    }

    return fs.statSync(path.join(cwd, item)).isFile() && path.extname(item).toLowerCase() === '.md';
  });

  dirs = content.filter(function (item) {
    return fs.statSync(path.join(cwd, item)).isDirectory();
  });

  if (req.url !== '/') {
    dirs.unshift('..');
  }

  req.dirs = dirs;
  req.files = files;
  req.cwd = dirs.concat(files);
  return next();
};

exports.index = function (req, res) {
  res.render('index', {
    title: path.basename(path.resolve(req.get('path'))),
    content: 'Select an .md file or folder from the sidebar.',
    dirs: req.dirs,
    files: req.files,
    dirs_and_files: req.cwd.map(function (item) {
      return {
        name: item
      };
    })
  });
};

exports.md = function (req, res) {
  var _path = path.join(req.app.get('path'), decodeURIComponent(req.params[0]));

  fs.exists(_path, function (exists) {
    if (!exists) {
      return res.render('index', {
        title: '404',
        content: 'file not found'
      }, 404);
    }
    fs.readFile(_path, function (err, content) {
      res.render('index', {
        title: path.basename(_path),
        content: marked(content.toString()),
        dirs: req.dirs,
        files: req.files,
        dirs_and_files: req.cwd.map(function (item) {
          return {
            name: item
          };
        })
      });
    });
  });
};