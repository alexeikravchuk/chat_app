const socket = new WebSocket('ws://localhost:3000/chat/people');

socket.onmessage = (e) => {
	console.log('Message from websocket', e.data);
};

socket.onopen = (e) => {
	console.log('web socket opened!');
};

socket.onerror = (e) => {
	console.log('something went wrong!', e);
};

socket.onclose = (e) => {
	console.log('web socket has been closed!');
};