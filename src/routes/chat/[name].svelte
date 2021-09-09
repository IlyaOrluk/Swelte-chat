<script context="module">
  export async function preload(page, session) {
    const { name } = page.params;

    return { name };
  }
</script>

<script>
  import { onDestroy, onMount } from "svelte";
  import moment from "moment";
  import UsersBar from "../../components/UsersBar.svelte";
  import { users } from "../../stores/users";
  import { messages } from "../../stores/messages";
  import Messages from "../../components/Messages.svelte";
  import { get } from "svelte/store";
  import io from "socket.io-client";
  const socket = io.connect();
  export let name;
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  let user = {
    username: username,
    avatar: avatar,
  };

  let message = "";

  $: listener = $users.find((u) => u.username === name);

  onMount(() => {
    // console.log(listener, name);
    socket.emit("join", user);
    !!$users.length && socket.emit("getUsers");
  });

  socket.on("users", (data) => {
    users.set(data);
  });
  // onDestroy(() => {
  //   socket.emit("leave", user);
  // });

  const scrollBottom = (element, scroll) => {
    element.scrollTop = scroll;
  };
  $: listenerMessages = !!$messages.find((m) => m.listener === name)
    ? $messages.find((m) => m.listener === name).messages
    : [];
    
  socket.on("private message", (data) => {
    console.log(listenerMessages);
    // console.log(data, "private message");

    if (data.username === username || data.username === name) {
      messages.set([
        ...$messages.filter((m) => m.listener !== name),
        {
          listener: name,
          messages: [
            ...listenerMessages,
            {
              avatar: data.avatar,
              username: data.username,
              message: data.message,
              time: data.time,
            },
          ],
        },
      ]);
    } else {
      let otherMessages =
        $messages.find((m) => m.listener === data.username) !== undefined
          ? $messages.find((m) => m.listener === data.username).messages
          : [];

      console.log(otherMessages, "otherMessages");
      let otherListeners = !!$messages.filter(
        (m) => m.listener !== data.username
      )
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
    }
    console.log($messages);
    setTimeout(
      () =>
        scrollBottom(
          document.querySelector(".messages"),
          document.querySelector(".messages").scrollHeight
        ),
      0
    );
  });

  //add info to socket
  const addMessage = () => {
    socket.emit("private message", {
      message: {
        username: user.username,
        avatar: user.avatar,
        message: message,
        time: moment().format("DD.MM.YYYY HH:mm:ss"),
      },
      to: name,
    });
    message = "";
  };
</script>

<svelte:head>
  <title>Sapper Chat</title>
</svelte:head>
<div class="wrapper">
  <UsersBar users={$users} {name} />
  {#if listener}
    <main>
      <div class="header">
        <a href="/"><i class="fas fa-arrow-left" /></a>
        <div>
          <h2>{listener.username}</h2>
          <img class="avatar" src={listener.avatar} alt="" />
        </div>
        <a href="/lgl">
          <img
            class="burger"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fwirecons-free-vector-icons%2F32%2Fmenu-alt-256.png&f=1&nofb=1"
            alt=""
          />
        </a>
      </div>
      <Messages {user} messages={listenerMessages} />
      <form on:submit={() => {}}>
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          on:input={(e) => (message = e.target.value)}
        />
        <button on:click|preventDefault={addMessage}>
          <i class="fas fa-paper-plane" />
        </button>
      </form>
    </main>
  {/if}
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100vw;
  }
  main {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
  }

  .avatar {
    background: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0;
  }
  h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #919191;
    height: 12vh;
  }

  .header > a {
    font-size: 20px;
    margin: 10px;
    color: #000;
  }

  .burger {
    width: 25px;
    height: 25px;
    margin: 10px;
  }

  form {
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form > input {
    font-size: 16px;
    height: 50px;
    width: 25rem;
    padding: 0 10px;
    border: 0;
    border-bottom: 0.2rem solid #5f5f5f;
    margin-bottom: 1rem;
  }

  form > input:focus {
    outline: none;
  }

  form > button {
    font-size: 26px;
    border: 0;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: transparent;
    cursor: pointer;
    color: #5f5f5f;
  }
</style>
