<style>

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
		color: #2a5d68;
	}



	main {
		height: 70vh;
		width: 330px;
		border: 2px solid #2a5d68;
		display: flex;
		flex-direction: column;
	}
	.messages {
		position: relative;
		height: 65vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		overflow: auto;
	}
	.messages__item {
		width: 90%;
		border: 1px solid #2a5d68;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin: 10px auto;
		padding: 10px;
		background-color: #c5d7d9;
		color: #2a5d68;
		border-radius: 15px 15px 0 14px;
	}
	.messages__item > div{
		display: flex;
		flex-direction: column;
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
		const socket = io.connect()
	
		// console.log(socket)
	export async function preload(page, session) {
		const { id } = page.params

		socket.emit('create', id)
	}
</script>
<script>
	import { onDestroy } from 'svelte';
	import { goto } from '@sapper/app'
	import { name } from '../../store.js'
	// if(!$name) goto('/')
	let message = ''
	let messages = [{name: 'Frank',message: 'Hi all!',  time: '4:20'}]
	socket.on('test', data => {
		console.log(data)
		messages = [...messages, {name: data.name,message: data.message,  time: data.time}]
	})

	const addMessage = () => {
		let date = new Date
		socket.emit('test', {name: $name, message: message,  time: `${date.getHours()}:${date.getMinutes()}`})
		messages = [...messages, {name: $name, message: message,  time: `${date.getHours()}:${date.getMinutes()}`}]
		message = ''
		console.log(messages)

		console.log(document.querySelector('.messages'))
		document.querySelector('.messages').scrollTop()
	}
	console.log(io())
</script>

<svelte:head>
	<title>Sapper Chat</title>
</svelte:head>

<h1>CHAT</h1>
<main>
	<div class='messages'>
		{#each messages as message}
			{#if message}
			<div class={`messages__item`}>
				<div>
					<b><label>{message.name}</label></b>
					<span>{message.message}</span>
				</div>
				<span>{message.time}</span>
			</div>
			{/if}
		{/each}
	</div>
	<form on:submit={() => {}}>
		<input type='text' placeholder="message" value={message} on:input={e => message = e.target.value}>
		<button on:click|preventDefault={() => addMessage()}>ADD</button>
	</form> 
</main>



