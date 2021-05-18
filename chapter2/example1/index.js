const fs = require('fs')
const http = require('http')
const path = require('path')

http.createServer((req, res) => {
	if (req.url === '/') {
		fs.readFile(path.join(__dirname, '/commnet.json'), (err, data) => {
			if (err) {
				console.error(err)
				res.end('Server Error')
			} else {
				const titles = JSON.parse(data.toString())
				fs.readFile(path.join(__dirname, '/template.html'), (err, data) => {
					if (err) {
						console.error(err)
						res.end('Server Error')
					} else {
						const tmpl = data.toString()
						const html = tmpl.replace('%', titles.join('</li><li>'))
						res.writeHead(200, { 'Content-Type': 'text/html' })
						res.end(html)
					}
				})
			}
		})
	}
}).listen(8000, '127.0.0.1')
console.log(__dirname)
