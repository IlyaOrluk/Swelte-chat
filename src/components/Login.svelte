<script>
	import { login } from '../utils/auth.js'
    
    let username = ''
    let password = ''
</script>

<h1>Login</h1>
<form>
	<input type='text' placeholder="username" value={username} on:input={e => username = e.target.value}>
	<input type='password' placeholder="passworn" value={password} on:input={e => password = e.target.value}>
    <button on:click|preventDefault={() => login(username, password)}>Login</button>
</form>

<style>

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
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

