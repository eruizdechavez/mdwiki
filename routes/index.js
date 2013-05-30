var marked = require('marked'),
  path = require('path'),
  fs = require('fs');

function list(req, res, next) {
<<<<<<< HEAD
=======
  /* Change to regular expression */
  //var url = decodeURIComponent(req.url).replace('/(save|edit)$/ig','');

>>>>>>> 77d96ce6177cf227ac08e8ec5a30fc3cbf7541b9
  var url = decodeURIComponent(req.url).split('.md/');
  var app_path = path.join(req.app.get('path'), url),
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
<<<<<<< HEAD
  app.get('/new', list, exports.new);
=======
>>>>>>> 77d96ce6177cf227ac08e8ec5a30fc3cbf7541b9
  app.get(/((.+)\.md\/edit$)/i, list, exports.edit);
  app.post(/((.+)\.md\/save$)/i, list, exports.save);
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

<<<<<<< HEAD
exports.new = function (req, res) {
  
};

=======
>>>>>>> 77d96ce6177cf227ac08e8ec5a30fc3cbf7541b9
exports.edit = function (req, res) {
  var app_path = path.join(req.app.get('path'), decodeURIComponent(req.url).replace('/edit',''));
  var url = path.basename(app_path);
  var content = fs.readFileSync(app_path);

  if (!fs.existsSync(app_path)) {
    return res.render('index', {
      title: '404',
      content: 'file not found'
    }, 404);
  }else {
    res.render('edit', {
      edit: 'active',
      dirs_and_files: req.dirs_and_files,
      title: path.basename(app_path),
      content: content
    });
  }
};

exports.save = function (req, res) {
  var fileName = req.body.fileName;
  var fileContent = req.body.fileContent;
<<<<<<< HEAD
  var pathFile = req.app.get('path').replace(/[/\\*]/g, "/");

  if (fileName != ''){
    if (verifyExtension(fileName) === true) {
      fs.writeFile(pathFile + '/' + fileName, fileContent, function(err, data) {
        if (err) {
          return res.render('index', {
            title: '404',
            content: 'file not found'
          }, 404);
        }else {
          marked(fileContent);
          res.redirect(fileName+'/edit');
=======
  var path = req.app.get('path').replace(/[/\\*]/g, "/");

  if (fileName != ''){
    if (verifyExtension(fileName) === true) {
      fs.writeFile(path + '/' + fileName, fileContent, function(err, data) {
        if (err) {
          //console.log('Error: ' + err);
        }else {
          marked(fileContent);
>>>>>>> 77d96ce6177cf227ac08e8ec5a30fc3cbf7541b9
        }
      });
    }
  }else {
<<<<<<< HEAD
    return res.render('index', {
            title: '404',
            content: 'file not found'
    }, 404);
=======
    //console.log('Error: Extension');
>>>>>>> 77d96ce6177cf227ac08e8ec5a30fc3cbf7541b9
  }
};

/* Functions */
function verifyExtension(fileName) {
  if ((path.extname(fileName) == '.md') || (path.extname(fileName) == '.markdown')) {
    return true;
  }else {
    return false;
  }
}