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


</script>

<svelte:head>
	<title>Sapper Chat</title>
</svelte:head>

<h1>login</h1>

<input value={$name} placeholder="login" on:input={e => name.set(e.target.value)}>
<a href='/chat/2'><button>Go</button></a>

