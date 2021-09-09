<script>
  import { afterUpdate } from "svelte";

  import { isImgLink } from "../utils/validation";

  export let users = [];
  let localUsername = localStorage.getItem("username");
  let localAvatar = localStorage.getItem("avatar");
  $: user = {
    username: localUsername,
    avatar: localAvatar,
  };

  afterUpdate(() => {
    localUsername = localStorage.getItem("username");
    localAvatar = localStorage.getItem("avatar");
    console.log(users);
  });

  $: isAuth = !!localUsername && !!localAvatar;
</script>

<div
  class="wrapper"
  style="--display: {users.length && isAuth ? 'flex' : 'none'};"
>
  <a href={"/"} class="user">
    {#if isImgLink(user.avatar)}
      <img src={user.avatar} alt="" />
    {:else}
      <span>?</span>
    {/if}
    <span>{user.username}</span>
  </a>
  <hr />
  <h4>HERE:</h4>
  {#each users.filter((u) => u.username !== user.username) as user}
    <a href={"/chat/" + user.username} class="user">
      {#if !!user.messages}
        <div class="mail">
          <i class="fas fa-envelope" />
          <div class="length">{user.messages}</div>
        </div>
      {/if}
      {#if isImgLink(user.avatar)}
        <img src={user.avatar} alt="" />
      {:else}
        <span>?</span>
      {/if}
      <span>{user.username}</span>
    </a>
  {/each}
</div>

<style>
  .wrapper {
    height: 100vh;
    width: 15vw;
    display: var(--display);
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background: #fff;
    border-right: 1px solid #919191;
  }

  .user {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 20px;
    text-decoration: none;
  }
  .user > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .user > span {
    color: rgb(48, 48, 42);
    font-weight: bold;
  }

  hr {
    width: 95%;
    height: 0.5px;
    background: #e2e2e2;
    border: 0;
  }

  .mail {
    position: absolute;
    top: -5%;
    right: 10%;
    color: #0181f0;
    font-size: 175%;
  }
  .length {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 30%;
    right: -70%;
    height: 17px;
    width: 17px;
    border-radius: 50%;
    background: #ff7070;
    color: #ffffff;
    border: 2px solid #fff;
    font-size: 40%;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
