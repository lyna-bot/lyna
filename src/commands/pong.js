export const Pong = {
	name: 'pong',
	description: 'Pong!',
	execute(message, args) {
		message.channel.send('Ping!');
	},
}
