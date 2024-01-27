const socket = new WebSocket('ws://localhost:3000/chat/people');

socket.onmessage = (e) => {
	console.log('Message from websocket', e.data);
};