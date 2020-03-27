<style>

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}



	main {
		height: 70vh;
		border: 2px solid #999;
		display: flex;
		flex-direction: column;
	}
	.messages {
		position: relative;
		height: 65vh;
	}
	.wrapper {
		display: flex;
		width: 100%;
	}

	.left {
		justify-content: flex-start
	}

	.right {
		justify-content: flex-end
	}
	

	form {
		height: 5vh;
		display: flex;
		justify-content: center;
		border-top: 1px solid #999;
		background: rgba(0, 0, 0, 0.26);
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>


<script context="module">
	import io from 'socket.io-client'
		const socket = io.connect();
		console.log(socket)
	export async function preload(page, session) {
		const { id } = page.params
		socket.emit('create', id);
		
		// socket.to('2').event('chat message')
	}
</script>
<script>

	import { goto } from '@sapper/app';
	import { name } from '../../store.js'



	// if(!$name) {
	// 	goto('/');
	// }



	// let message = ''
	// const sandMessage = (name, text) => {
	// 	const date = new Date
	// 	const time = `${date.getHours()}:${date.getMinutes()}`
	// 	// console.log(date.getMinutes())
	// 	socket.emit('chat message', `{"name": "${name}", "message": "${text}", "time": "${time}"}`)


	// 	messages = [...messages, {name: name, message: message, time: time}]
	// 	message = ''
	// }

	// let messages = []
	//     socket.on('chat message', function(data){
	// 		const pdata = JSON.parse(data)
	// 		messages = [...messages, {
	// 				name: pdata.name,
	// 				message: pdata.message,
	// 				time: pdata.time
	// 			}]
	// 	});

	    socket.on('chat message', function(data){
			console.log(data)
		});
		
</script>

<svelte:head>
	<title>Sapper Chat</title>
</svelte:head>

<h1>CHAT</h1>
<main>
	<!-- <div class='messages'>
	{#each messages as message}
		<div class="wrapper right">
			{#if message}
			<div class={`messages__item`}>
				<b><label>{message.name}: </label></b>
				<span>{message.message}</span>
				<span>{message.time}</span>
			</div>
			{/if}
		</div>
	{/each}
	</div> -->
	<form on:submit={() => {}}>
		<!-- <input type='text' placeholder="message" value={message} on:input={e => message = e.target.value}> -->
		<button on:click|preventDefault={() => socket.emit('chat message', 'HI ALL in room_1')}>ADD</button>
	</form> 
</main>



