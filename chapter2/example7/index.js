const net = require('net')
const EventEmitter = require('events')
const { listenServer } = require('../../common/common.js')

const channel = new EventEmitter()
channel.clients = {}
channel.subscriptions = {}

channel.on('join', function(id, client) {
	this.clients[id] = client
	this.subscriptions[id] = (senderId, message) => {
		if (id !== senderId) {
			this.clients[id].write(message)
		}
	}
	this.on('broadcast', this.subscriptions[id])
})

channel.on('leave', function(id) {
	channel.removeListener('broadcast', this.subscriptions[id])
	channel.emit('broadcast', id, `${id} has left the chatroou.\n`)
})
channel.on('shutdown', () => {
	channel.emit('broadcast', '', 'The server has shut down.\n')
	channel.removeAllListeners('broadcast')
})

const server = net.createServer(client => {
	const id = `${client.remoteAddress}:${client.remotePort}`
	channel.emit('join', id, client)
	client.on('data', data => {
		data = data.toString()
		if (data === 'shutdown\r\n') {
			channel.emit('shutdown')
		}
		channel.emit('broadcast', id, data)
	})
	client.on('close', () => {
		channel.emit('leave', id)
	})
})

listenServer(server)

