<script>
  let username = "";
  let avatar = "";
  const setDateToLocal = (username, avatar) => {
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", avatar);
  };
</script>

<nav>
  <div>
    <input
      placeholder="type chat name..."
      value={username}
      on:input={(e) => (username = e.target.value)}
    />
        <input
      placeholder="enter avatar link..."
      value={avatar}
      on:input={(e) => (avatar = e.target.value)}
    />
    <a href={"/chat/1"} on:click={() => setDateToLocal(username, avatar)}>
      <button>ENTER CHAT</button>
    </a>
  </div>
  <!-- <button on:click={() => logout()}>LOGOUT</button> -->
</nav>
