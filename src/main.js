import socketClient from 'socket.io-client'
import App from './App.svelte';
import { nodesData } from './store'

import './assets/main.sass'

const socket = socketClient(window.location.origin)

socket.on('node', data => {
	nodesData.update(() => data)
})

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
