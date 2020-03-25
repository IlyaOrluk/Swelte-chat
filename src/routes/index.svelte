<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}


	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>


<script>
	import io from 'socket.io-client'
	const socket = io()

	

	let message = ''
	let name = ''
	const sandMessage = (name, text) => {
		socket.emit('chat message', `{"name": "${name}", "message": "${text}"}`)


		messages = [...messages, {name: name, message: message}]
		message = ''
		name = ''
	}

	let messages = [{name: 'Jon', message: 'Hi all people!'}]


	    socket.on('chat message', function(data){
			console.log(JSON.parse(data))
			messages = [...messages, {name: JSON.parse(data).name, message: JSON.parse(data).message}]
			console.log(data)
			console.log(messages, '2log')
    	});

</script>

<svelte:head>
	<title>Sapper Chat</title>
</svelte:head>

<h1>CHAT</h1>

<figure>
	<input type='text' placeholder="name" value={name} on:input={e => name = e.target.value}>
	<input type='text' placeholder="message" value={message} on:input={e => message = e.target.value}>
	<button on:click={() => sandMessage(name, message)}>ADD</button>
</figure>
<div class='messages'>
{#each messages as message}
	<div>
		{#if message.name}
			<b><label>{message.name}: </label></b>
			<span>{message.message}</span>
		{:else}
			<b><span>{message.message}</span></b>
		{/if}
	</div>
{/each}
</div>


