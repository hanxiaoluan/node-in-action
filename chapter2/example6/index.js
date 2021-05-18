const EventEmitter = require('events')
const net = require('net')
const channel = new EventEmitter()
const { listenServer } = require('../../common/common')
channel.clients = {}
channel.subscriptions = {}

channel.on('join', (id, client) => {
	channel.clients[id] = client
	channel.subscriptions[id] = (senderId, message) => {
		if (id !== senderId) {
			channel.clients[id].write(message)
		}
	}
	channel.on('broadcast', channel.subscriptions[id])
})

const server = net.createServer(client => {
	const id = `${client.remoteAddress}:${client.remotePort}`
	channel.emit('join', id, client)
	client.on('data', data => {
		data = data.toString()
		channel.emit('broadcast', id, data)
	})
})

listenServer(server)
