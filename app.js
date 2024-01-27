import express from 'express';

export const app = express();

app.use(express.static('static/'));

// import ChatUser from './ChatUser.js';

app.get('/:roomName', (req, res) => {
	res.sendFile(import.meta.dirname + '/chat.html');
});

