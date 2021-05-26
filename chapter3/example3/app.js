const express = require('express')

const app = express()
const { sequelize } = require('./models/Article')

app.set('port', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
	res.send('Notes App')
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
