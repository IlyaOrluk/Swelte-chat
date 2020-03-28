<script>
	import Nav from '../components/Nav.svelte';

	// export let segment
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	:global(body) {
		background-color: #fffede;
	}
</style>

<!-- <Nav {segment}/> -->

<main>
	<slot></slot>
</main>

<!-- 
#2a5d68
#7dbbb9
#c5d7d9
#d8d3d0
#dcdbe1
 -->