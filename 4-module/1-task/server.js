const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs').promises;

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const hasNesting = pathname.split('/').length > 1;

  if (hasNesting) {
    res.statusCode = 400;
    res.end('nesting banned');
  }

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      fs.readFile(filepath).then((file) => {
        res.statusCode = 200;
        res.end(file);
      }).catch(() => {
        res.statusCode = 404;
        res.end('not found');
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
