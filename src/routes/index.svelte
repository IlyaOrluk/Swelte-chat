<style>

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}




	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>


<script>
	import { name } from '../store.js'

	let room = ''
</script>

<svelte:head>
	<title>Sapper Chat</title>
</svelte:head>

<h1>login</h1>


<form on:submit={() => {}}>
	<input value={$name} placeholder="login" on:input={e => name.set(e.target.value)}>
	<input type='text' placeholder="room" value={room} on:input={e => room = e.target.value}>
	<a href={'/chat/'+room}>go</a>
</form> 
