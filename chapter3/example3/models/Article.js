const { Sequelize, DataTypes, Model } = require('sequelize')

const sequelize = new Sequelize('node-in-action3', 'root', 'luanhanxiao138', {
	host: 'localhost',
	dialect: 'mysql'
})

// ;(async() => {
// 	try {
// 		await sequelize.authenticate()
// 		console.log('Connection has been established successfully.')
// 	} catch (error) {
// 		console.error('Unable to connect to the database:', error)
// 	}
// })()

class Article extends Model {}

Article.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false
	}
}, {
	sequelize

})

module.exports = {
	Article,
	sequelize
}
