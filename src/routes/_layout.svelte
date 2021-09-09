<script>
	import Nav from '../components/Nav.svelte';

	// export let segment
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		min-height: 100vh;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-direction: column;

	}
	:global(body) {
		background: #616161;
		min-height: 100vh;
		overflow: hidden;
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