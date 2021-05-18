const fs = require('fs')
const http = require('http')
const path = require('path')

http.createServer((req, res) => {
	if (req.url === '/') {
		getTitle(res)
	}
}).listen(8000, 'localhost')

function hadError(err, res) {
	console.error(err)
	res.end('Server Error')
}

function getTitle(res) {
	fs.readFile(path.join(__dirname, './comment.json'), (err, data) => {
		if (err) {
			hadError(err, res)
		} else {
			getTemplate(JSON.parse(data.toString()), res)
		}
	})
}

function getTemplate(titles, res) {
	fs.readFile(path.join(__dirname, './template.html'), (err, data) => {
		if (err) {
			hadError(err, res)
		} else {
			formatHtml(titles, data.toString(), res)
		}
	})
}

function formatHtml(titles, tmpl, res) {
	const html = tmpl.replace('%', titles.join('</li><li>'))
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end(html)
}
