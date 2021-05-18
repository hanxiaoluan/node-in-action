const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
	getTitles(res)
})

server.listen(3000, () => {
	console.log('listening on 3000')
})

function hadError(err, res) {
	console.error(err)
	res.end('Server Error')
}

function formatHtml(titles, tmpl, res) {
	const html = tmpl.replace('%', titles.join('</li><li>'))
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end(html)
}

function getTemplate(titles, res) {
	fs.readFile(path.join(__dirname, './template.html'), (err, data) => {
		if (err) return hadError(err, res)
		formatHtml(titles, data.toString(), res)
	})
}

function getTitles(res) {
	fs.readFile(path.join(__dirname, './comment.json'), (err, data) => {
		if (err) return hadError(err, res)
		getTemplate(JSON.parse(data.toString()), res)
	})
}
