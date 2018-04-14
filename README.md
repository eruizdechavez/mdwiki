No longer maintained
====================

Interested? Send me an email to erick@erch.co.


## mdwiki

This project was created due to my necesity to have an easy to mantain documentation repository that is not dependent on any other server or database and since [Markdown](http://daringfireball.net/projects/markdown/) is one of the most common formats today for this documentation types and [Git Flavored Markdown](http://github.github.com/github-flavored-markdown/) is even better, then it was an obvious choice.

By using ```mdwiki``` as a global module you will be able to run it on your project folder and nicely read any [Markdown](http://daringfireball.net/projects/markdown/) you have on it; if you have (and I am sure you do have) other modules installed on your project, you'll be able to also easily read their documentation without having to navigate to other places.

```mdwiki``` will also detect and use any README.md file as the current folder "index".

This module is only for **local server**. In the future it may be switable for a "production" environment, but not for now.

## Install

```npm install -g mdwiki```

## Usage

If all you want to do is read your rendered [Markdown](http://daringfireball.net/projects/markdown/) files, just fire the commands below and forget about the console.

```
cd to/your/project/folder
mdwiki
```

You can also ask ```mdwiki``` to serve content on a different folder:

```
cd to/your/project/folder
mdwiki ./wiki
```

### Command Line Options

```mdwiki``` currently suppors following options:

```
  -h, --help         output usage information
  -p, --port [port]  Port [8080]
  -W, --no-watch     Disable folder watch (Browser autoreload)
```

If something else is using port 8080 and you need to run ```mdwiki``` on a different folder, just add the port option:

```
mdwiki -p 3000
```

By deafult ```mdwiki``` will watch for changes on the content folder and use [socket.io](https://github.com/learnboost/socket.io) to live reload the browser, this behavior can be disabled by using ```--no-watch``` modifier.

```
mdwiki --no-watch
```

## Dependencies

```mdwiki``` is a [Node.js](http://nodejs.org/) module, therefore you must have [Node.js](http://nodejs.org/) installed.

Some of the used libraries include:

- [express](https://github.com/visionmedia/express)
- [hjs](https://github.com/nullfirm/hjs.git)
- [express-partials](https://github.com/publicclass/express-partials)
- [bunyan](https://github.com/trentm/node-bunyan)
- [commander](https://github.com/visionmedia/commander.js)
- [marked](https://github.com/chjj/marked)
- [highlight.js](https://github.com/isagalaev/highlight.js)
- [socket.io](https://github.com/learnboost/socket.io)

## Licence

Copyright (c) 2013 Erick Ruiz de Chavez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

- The above copyright notice and this permission notice shall be
- included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
