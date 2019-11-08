let req = require;

let http = req('http');
let url = req('url');
let fs = req('fs');

http
  .createServer((req, res) => {
    let path = url.parse(req.url, true)
    let filename = '';

    if (path.pathname === '/') {
      filename = './index.html'
    } else if (path.pathname === '/about' || path.pathname === '/contact-me') {
      filename = `.${path.pathname}.html`
    } else {
      filename = './404.html'
    }

    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        return res.end('404 Not Found')
      }

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      return res.end()
    })
  })
  .listen(8080)