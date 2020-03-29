<style>

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}


	img {
		width: 100vw;
		max-width: 670px;
	}
	form {
		min-width: 300px;
	}
	form > input{
		width: 100%;
		font-size: 25px;
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
	<a href={'/chat/'+room}><button>go</button></a>
</form> 
<img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuimovement.com%2Fmedia%2Fresource_image%2Fimage_6761_Aoi4J5i.gif&f=1&nofb=1' alt=''>
