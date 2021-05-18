const net = require('net')
const { listenServer } = require('../../common/common')

const server = net.createServer(socket => {
	socket.once('data', data => {
		socket.write(data)
	})
})

listenServer(server)
