<style>
	main {
		height: 100vh;
		width: 100%;
		border: 2px solid #9c4b28;
		display: flex;
		flex-direction: column;
		background: #fffaf6;
	}
	.messages {
		position: relative;
		height: 80vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		scroll-behavior: smooth;
		box-sizing: border-box;
	}
	.messages__item {
		width: 90%;
		min-height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin: 10px auto;
		padding: 10px;
		background-color: rgb(233, 223, 223);
		color: #9c4b28;
		border-radius: 25px 25px 25px 0;
	}
	.messages__item > div{
		display: flex;
		flex-direction: column;
	}
	.me {
		border-radius: 25px 25px 0 25px;
		background-color: #fff;
		border: 1px solid rgb(233, 223, 223);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #9c4b28;
		height: 10vh;
	}

	.header > a {
		font-size: 20px;
		margin: 10px;
		color: #000;
	}	

	.header > img {
		width: 40px;
		height: 40px;
		margin: 10px;
	}
	

	form {
		height: 10vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #ffd1bb;
	}

	form > input {
		font-size: 16px;
		height: 50px;
		padding: 0 10px;
		border: 0;
		border-radius: 35px;
	}

	form > button {
		font-size: 26px;
		border: 0;
		border-radius: 50%;
		height: 50px;
		width: 50px;
		background-color: transparent;
		cursor: pointer;
	}

</style>


<script context="module">
	import io from 'socket.io-client'
	const socket = io.connect()
	export async function preload(page, session) {
		const { id } = page.params

		socket.emit('create', id)
		return { id }
	}
</script>
<script>
	import { onDestroy, onMount } from 'svelte'
	import { goto } from '@sapper/app'
	import { scale } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import { name } from '../../store.js'
	import axios from 'axios'
	export let id

	// if(!$name) goto('/')
	onDestroy(() => {
		console.log('destroy onmount')
		socket.emit('leave room')
	})
	const scrollBottom = (element, scroll) => {
		element.scrollTop = scroll
	}

	let message = ''
	let messages = [{name: 'Frank',message: 'Hi all!',  time: '4:20'}]
	socket.on('chat', data => {
		messages = [...messages, {name: data.name,message: data.message,  time: data.time}]
		setTimeout(() => scrollBottom(document.querySelector('.messages'), document.querySelector('.messages').scrollHeight), 210);
	})
	const addMessage = () => {
		let date = new Date
		socket.emit('chat', {name: $name, message: message,  time: `${date.getHours()}:${date.getMinutes()}`})
		messages = [...messages, {name: $name, message: message,  time: `${date.getHours()}:${date.getMinutes()}`}]
		message = ''

		setTimeout(() => scrollBottom(document.querySelector('.messages'), document.querySelector('.messages').scrollHeight), 210);
	}

	
	const url = 'http://127.0.0.1:8000/auth/users/me/'
	let user
	const confirm = (token) => {
		console.log('confirm chat')
            axios.get(url,
                {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('Token')}` 
                    }
                }
            )
                .then(res => {
					user = res.data
					name.set(res.data.username)
					console.log(res.data)
				})
    
	}
	
	onMount(() => {
		console.log('mount')
		if(localStorage) confirm(localStorage.getItem('Token'))
	})
</script>

<svelte:head>
	<title>Sapper Chat</title>
</svelte:head>


<main>
	<div class='header'>
		<a href='/'><i class="fas fa-arrow-left"></i></a>
		<h2>Room({id})</h2>
		<img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fwirecons-free-vector-icons%2F32%2Fmenu-alt-256.png&f=1&nofb=1' alt=''>
	</div>
	<div class='messages'>
		{#each messages as message}
			{#if message}
			<div class={`messages__item ${message.name === $name? 'me':''}`} transition:scale="{{duration: 200, delay: 0, opacity: 0, start: 0, easing: quintOut}}">
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
		<button on:click|preventDefault={() => addMessage()}><i class="fas fa-paper-plane"></i></button>
	</form> 
</main>



