/**
 * 监听server
 */

exports.listenServer = (server, port = 3000) => {
	server.listen(port, () => {
		console.log(`Your server is listening on port ${port}`)
	})
}
