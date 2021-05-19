const fs = require('fs')
const path = require('path')
const tasks = []
const wordCounts = {}
const filesDir = '../text'
let completedTasks = 0

function checkIfComplete() {
	completedTasks++
	if (completedTasks === tasks.length) {
		for (const index in wordCounts) {
			console.log(`${index}:${wordCounts[index]}`)
		}
	}
}

function addWordCount(word) {
	wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1
}

function countWordsInText(text) {
	const words = text.toString().toLowerCase().split(/\W+/).sort()
	words.filter(word => word).forEach(word => addWordCount(word))
}

fs.readdir(path.join(__dirname, filesDir), (err, files) => {
	if (err) throw err
	files.forEach(file => {
		const task = (file => () => {
			fs.readFile(file, (err, text) => {
				if (err) throw err
				countWordsInText(text)
				checkIfComplete()
			})
		})(path.join(__dirname, `${filesDir}/${file}`))

		tasks.push(task)
	})
	tasks.forEach(task => task())
})
