const urlParts = window.location.pathname.split('/').at(-1);

const socket = new WebSocket(`ws://localhost:3000/chat/${urlParts}`);
const username = prompt('Enter your username (no spaces)');

socket.onmessage = (e) => {
	console.log('Message from websocket', e.data);
	const data = JSON.parse(e.data);

	switch (data.type) {
		case 'note': {
			const item = document.createElement('li');
			const text = document.createElement('em');
			text.textContent = data.text;
			item.append(text);
			document.getElementById('messages').append(item);
			break;
		}
		case 'chat': {
			const item = document.createElement('li');
			item.innerHTML = `<strong>${data.name}</strong>: ${data.text}`;
			document.getElementById('messages').append(item);
		}
	}
};

socket.onopen = (e) => {
	console.log('web socket opened!');
	socket.send(JSON.stringify({ type: 'join', name: username }));

	socket.send(JSON.stringify({ type: 'get-joke' }));

};

socket.onerror = (e) => {
	console.log('something went wrong!', e);
};

socket.onclose = (e) => {
	console.log('web socket has been closed!');
};

document.getElementById('msg-form')
	.addEventListener('submit', (e) => {
		e.preventDefault();
		const input = document.getElementById('messageInput');
		const text = input.value;
		input.value = '';
		socket.send(JSON.stringify({ type: 'chat', text: text }));
	});

