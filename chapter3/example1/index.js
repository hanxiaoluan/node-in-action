const Express = require('express')
const app = new Express()

const articles = [{ title: 'Example' }]

app.set('port', process.env.PORT || 3000)
app.get('/articles', (req, res, next) => {
	res.send(articles)
})

app.post('/articles', (req, res, next) => {
	res.send('OK')
})

app.get('/articles/:id', (req, res, next) => {
	const id = req.params.id
	console.log('Fetching:', id)
	res.send(articles[id] ? articles[id] : 'Sorry, the article you are looking for does not exist')
})

app.delete('/articles/:id', (req, res, next) => {
	const id = req.params.id
	console.log('Deleting:', id)
	articles[id] && articles.splice(id, 1)
	res.send({ message: 'Deleted' })
})

app.listen(app.get('port'), () => {
	console.log('App started on port', app.get('port'))
})
