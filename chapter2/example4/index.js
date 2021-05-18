/**
 * 用on方法监听事件
 */

const net = require('net')
const { listenServer } = require('../../common/common')
const server = net.createServer(socket => {
	socket.on('data', data => {
		socket.write(data)
	})
})

listenServer(server)
