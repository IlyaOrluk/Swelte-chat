<script>
  import io from "socket.io-client";
  import { afterUpdate, onMount } from "svelte";
  import { isImgLink } from "../utils/validation";
  import { messages } from "../stores/messages";
import { changeNewMessagesTick } from "../stores/users";

  export let users = [];
  const socket = io.connect();
  let localUsername = localStorage.getItem("username");
  let localAvatar = localStorage.getItem("avatar");
  let username = localUsername ? localUsername : "";
  let avatar = localAvatar ? localAvatar : "";

  $: user = {
    username: username,
    avatar: avatar,
  };

  $: isAuth = !!localUsername && !!localAvatar;

  $: checkUsername =
    !localAvatar && !!users.find((u) => u.username === username);

  onMount(() => {
    isAuth && socket.emit("join", user);
  });

  afterUpdate(() => {
    localUsername = localStorage.getItem("username");
    localAvatar = localStorage.getItem("avatar");
  });
  const setDateToLocal = (username, avatar) => {
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", avatar);
    localUsername = localStorage.getItem("username");
    localAvatar = localStorage.getItem("avatar");
    socket.emit("join", user);
  };
  const removeLocalDate = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    username = "";
    avatar = "";
    socket.emit("leave", user);
  };

  socket.on("private message", (data) => {
    console.log(data);
    changeNewMessagesTick(data.username)
    let otherMessages =
      $messages.find((m) => m.listener === data.username) !== undefined
        ? $messages.find((m) => m.listener === data.username).messages
        : [];
    let otherListeners = !!$messages.filter((m) => m.listener !== data.username)
      ? $messages.filter((m) => m.listener !== data.username)
      : [];
    messages.set([
      ...otherListeners,
      {
        listener: data.username,
        messages: [
          ...otherMessages,
          {
            avatar: data.avatar,
            username: data.username,
            message: data.message,
            time: data.time,
          },
        ],
      },
    ]);
  });
</script>

<nav>
  <div class="column">
    <div class="row">
      <div class="avatar">
        {#if isImgLink(avatar)}<img src={avatar} alt="" />
        {:else}<span>?</span>{/if}
      </div>
      <div class="column">
        <input
          placeholder="type chat name..."
          value={username}
          readonly={isAuth}
          on:input={(e) => (username = e.target.value)}
        />
        <input
          placeholder="enter avatar link..."
          value={avatar}
          readonly={isAuth}
          on:input={(e) => (avatar = e.target.value)}
        />
        {#if checkUsername}
          <span class="error">Username is already taken!</span>
        {/if}
      </div>
    </div>
    {#if !isAuth}
      <button
        disabled={checkUsername}
        on:click={() => setDateToLocal(username, avatar)}
      >
        ENTER CHAT
      </button>
    {:else}
      <button on:click={() => removeLocalDate()}>EXIT</button>
    {/if}
  </div>
</nav>

<style>
  nav {
    height: 100vh;
    width: 100%;
    background: #616161;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .column > input {
    border-radius: 5px;
    margin: 1vh;
    padding: 10px;
  }

  .avatar {
    width: 5rem;
    height: 5rem;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .avatar > span {
    font-size: 4rem;
    color: #6161615e;
  }

  .avatar > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .error {
    color: #fff;
    font-size: 80%;
    margin: -3px;
  }
</style>
