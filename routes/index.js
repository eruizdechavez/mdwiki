var marked = require('marked'),
  path = require('path'),
  fs = require('fs');

function list(req, res, next) {
  var app_path = path.join(req.app.get('path'), decodeURIComponent(req.url)),
    dirs_and_files = [],
    cwd;

  if (!fs.statSync(app_path).isDirectory()) {
    cwd = path.dirname(app_path);
  } else {
    cwd = app_path;
  }

  fs.readdirSync(cwd).forEach(function (item) {
    if (req.url[req.url.length - 1] === '/' && path.basename(item).toLowerCase() === 'readme.md') {
      return res.redirect(req.url + item);
    }

    if (fs.statSync(path.join(cwd, item)).isDirectory()) {
      dirs_and_files.push({
        name: item,
        type: 'directory'
      });
    } else if (fs.statSync(path.join(cwd, item)).isFile() && path.extname(item).toLowerCase() === '.md') {
      dirs_and_files.push({
        name: item,
        type: 'file'
      });
    }
  });

  if (req.url !== '/') {
    dirs_and_files.unshift({
      name: '..',
      type: 'directory'
    });
  }

  req.dirs_and_files = dirs_and_files;
  return next();
}

exports.initialize = function (app) {
  app.get('/', list, exports.index);
  app.get(/(.+)\/$/, list, exports.index);
  app.get(/((.+)\.md$)/i, list, exports.md);
  app.get('/new', exports.new);
  app.get('/save', exports.save);
};

exports.index = function (req, res) {
  res.render('index', {
    title: path.basename(path.resolve(req.get('path'))),
    content: 'Select an .md file or folder from the sidebar.',
    dirs_and_files: req.dirs_and_files
  });
};

exports.md = function (req, res) {
  var app_path = path.join(req.app.get('path'), decodeURIComponent(req.params[0]));

  if (!fs.existsSync(app_path)) {
    return res.render('index', {
      title: '404',
      content: 'file not found'
    }, 404);
  }

  var content = fs.readFileSync(app_path);
  res.render('index', {
    title: path.basename(app_path),
    content: marked(content.toString()),
    dirs_and_files: req.dirs_and_files
  });
};

exports.new = function (req, res) {
  res.render('index', {
    create: 'active',
    content: '<div class="input-prepend"><span class="add-on">Name: </span>'+
             '<input class="span4" id="" type="text" placeholder="File name"></div>'+
             '<textarea class="field span7" rows="15"></textarea>'+
             '<p><button class="btn btn-info" type="button">Save</button></p>'
  });

};

exports.save = function (req, res) {

};