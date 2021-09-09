<script>
  import { afterUpdate, onMount } from "svelte";
  import io from "socket.io-client";
  import Login from "../components/Login.svelte";
  import UsersBar from "../components/UsersBar.svelte";
  import { users } from "../stores/users.js";

  const socket = io.connect();

  onMount(() => {
    // socket.emit("getUsers");
  });

  socket.on("users", (data) => {
    console.log(data);
    users.set(data);
  });
</script>

<div class="wrapper">
  <UsersBar users={$users} />
  <Login users={$users} />
</div>

<style>
  .wrapper {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
</style>
