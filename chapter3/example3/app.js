const express = require('express')

const app = express()
const { sequelize, Article } = require('./models/Article')

app.set('port', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
	res.send('Notes App')
})

app.get('/articles', async(req, res, next) => {
	const articles = await Article.findAll()
	res.send(articles)
})

app.get('/articles/:title', async(req, res, next) => {
	const title = req.params.title

	const article = await Article.findOne({ where: { title }})
	if (article === null) {
		res.send({ message: 'Article is not found' })
	} else {
		res.send(article)
	}
})

app.listen(app.get('port'), () => {
	sequelize.sync({
		force: false
	}).then(() => {
		console.log('sequelize connect success')
		console.log('App started on port', app.get('port'))
	}).catch(err => {
		console.log(err)
	})
})
