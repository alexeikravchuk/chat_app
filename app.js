import express from 'express';
import expressWs from 'express-ws';
import ChatUser from './ChatUser.js';

export const app = express();

app.use(express.static('static/'));


const wsApp = expressWs(app);
app.ws('/chat/:roomName', (ws, req, next) => {

	setTimeout(() => ws.send(Math.random()), 2000);
	setTimeout(() => ws.close(), 4000);
	/*try {
		const user = new ChatUser(ws.send.bind(ws), req.params.roomName);

		ws.on('message', function(msg) {
			try {
				user.handleMessage(msg);
			} catch (e) {
				console.error(e);
			}
		});

		ws.on('close', function() {
			try {
				user.handleClose();
			} catch (e) {
				console.error(e);
			}
		});

	} catch (e) {
		console.error(e);
	}*/
});

app.get('/:roomName', (req, res) => {
	res.sendFile(import.meta.dirname + '/chat.html');
});

