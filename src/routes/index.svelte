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
		socket.emit('chat message', `${name}: ${text}`)


		messages = [...messages, `${name}: ${message}`]
		message = ''
		name = ''
	}

	let messages = [{name: 'name', message: 'message'}]


	    socket.on('chat message', function(data){
			messages = [...messages, data]
			console.log(data)
			console.log(messages, '2log')
    	});

</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
	<input type='text' placeholder="name" value={name} on:input={e => name = e.target.value}>
	<input type='text' placeholder="message" value={message} on:input={e => message = e.target.value}>
	<button on:click={() => sandMessage(name, message)}>ADD</button>
</figure>
<div class='messages'>
{#each messages as message}
	<div>
		<!-- <b><label>{message.name}: </label></b>
		<span>{message.message}</span> -->
		<span>{message}</span>
	</div>
{/each}
</div>
<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>


