<script>
    import axios from 'axios'
    // import { name } from '../store.js'
    import { onMount } from 'svelte';
    import { logout, confirm } from '../utils/auth.js'

    const url = 'http://127.0.0.1:8000/auth/users/me/'
    let data
    let room = ''

    onMount(() => {
        confirm(localStorage.getItem('Token'))
            .then(res => data = res.res.data)
	});
</script>

<button on:click={() => logout()}>LOGOUT</button>
{#if data}
    <h2>User:</h2>
    <span>{data.username}</span>
    <h2>Mail:</h2>
    <span>{data.email}</span>
{/if}

<a href='/'>home</a>
<div>
    <input value={room} on:input={e=>room=e.target.value}><a href={'/chat/'+room} on:click={() => {}}>go room</a>
</div>
