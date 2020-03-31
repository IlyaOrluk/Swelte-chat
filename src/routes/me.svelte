<script>
    import axios from 'axios'
    // import { name } from '../store.js'
    import { onMount } from 'svelte';
    import { logout, confirm, changeAvatar } from '../utils/auth.js'

    const url = 'http://127.0.0.1:8000/auth/users/me/'
    let data
    let room = ''
    let avatar = ''

    onMount(() => {
        confirm(localStorage.getItem('Token'))
            .then(res => data = res.res.data)
    });
    
    
</script>

<nav>
    <a href='/'><button>HOME</button></a>
    <div>
        <input placeholder="type chat name..." value={room} on:input={e=>room=e.target.value}><a href={'/chat/'+room} on:click={() => {}}><button>ENTER CHAT</button></a>
    </div>
    <button on:click={() => logout()}>LOGOUT</button>
</nav>
{#if data}
    <div class="user">
        <img src={data.avatar} alt=''>
        <div class='user__info'>
            <h2>User:</h2>
            <span>{data.username}</span>
            <h2>Mail:</h2>
            <span>{data.email}</span>
        </div>
    </div>
{/if}



<!-- <h1 class="my-3">Upload an avatar.</h1>
<form id="avatar_form">
    <div class="form-group">
        <label for="id_avatar">Choose an image for your avatar</label>
        <input type="file" class="form-control-file" id="id_avatar" value={avatar} on:input={e => console.log(e.target.value)}/>
    </div>
    <button type="submit" class="btn btn-primary" on:click|preventDefault={() => changeAvatar(avatar)}>Upload</button>
</form> -->


<style>
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
    }
    nav {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap-reverse;
    }
    .user {
        display: flex;
        margin: 15px;
    }
    .user__info {
        margin: 15px;
    }
</style>