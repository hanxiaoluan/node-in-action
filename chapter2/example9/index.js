const path = require('path')
const fs = require('fs')
const htmlparser = require('htmlparser')
const request = require('request')

const configFilename = 'rss_feeds.txt'
console.log(path.join(__dirname, configFilename))
function checkForRSSFile() {
	fs.stat(path.join(__dirname, configFilename), (err, stats) => {
		if (err) return next(err)
		console.log(stats)
		if (!stats.isFile()) return next(new Error(`Missing RSS file:${configFilename}`))

		next(null, configFilename)
	})
}

function readRSSFile(configFilename) {
	fs.readFile(path.join(__dirname, configFilename), (err, feedList) => {
		if (err) return next(err)
		feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n')
		const random = Math.floor(Math.random() * feedList.length)
		next(null, feedList[random])
	})
}

function downloadRSSFeed(feedUrl) {
	request({ uri: feedUrl }, (err, res, body) => {
		if (err) return next(err)
		if (res.statusCode !== 200) return next(new Error('Abnormal response status code'))
		next(null, body)
	})
}

function parseRSSFeed(rss) {
	const handler = new htmlparser.RssHandler()
	const parser = new htmlparser.Parser(handler)
	parser.parseComplete(rss)
	if (!handler.dom.items.length) return next(new Error('No RSS items found'))

	const item = handler.dom.items.shift()
	console.log(item.title)
	console.log(item.link)
}

const tasks = [
	checkForRSSFile,
	readRSSFile,
	downloadRSSFeed,
	parseRSSFeed
]
function next(err, result) {
	if (err) throw err
	const currentTask = tasks.shift()
	// 如果数组为[] 返回undefined
	if (currentTask) {
		currentTask(result)
	}
}

next()
