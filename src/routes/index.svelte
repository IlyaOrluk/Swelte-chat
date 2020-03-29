<style>
	img {
		width: 100vw;
		max-width: 670px;
	}
</style>


<script>
	import { name } from '../store.js'
	import { onMount } from 'svelte';
	import Login from '../components/Login.svelte'
	import Signup from '../components/Signup.svelte'
	
	let token
	onMount(() => {
		token = localStorage.getItem('Token')
	})
</script>

<svelte:head>
	<title>Sapper Chat</title>
</svelte:head>

{#if !token}
	<Login />
	or
	<Signup/>
{:else}
	<span>Welcome to Chat App </span><a href='/me'>your account...</a>
{/if}

<!-- <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuimovement.com%2Fmedia%2Fresource_image%2Fimage_6761_Aoi4J5i.gif&f=1&nofb=1' alt=''> -->
