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
		background: #ffffff78;

	}
	:global(body) {
		background: url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F02%2F29%2F09%2F57%2Fbokeh-1228326_640.jpg&f=1&nofb=1') no-repeat center / cover;
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