<script>
  export let user;
  export let messages = [];

</script>

<div class="messages">
  {#each messages as message}
    <div class="messages__wrapper">
      {#if message.username !== user.username}
        <img class="avatar" src={message.avatar} alt="" />
      {/if}
      <div
        class={`messages__item ${
          message.username === user.username ? "me" : ""
        }`}
      >
        <div>
          <b><label>{message.username}</label></b>
          <span>{message.message}</span>
        </div>
        <span>{message.time}</span>
      </div>
      {#if message.username === user.username}
        <img class="avatar" src={message.avatar} alt="" />
      {/if}
    </div>
  {/each}
</div>

<style>
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

  .messages__wrapper {
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .messages__item {
    width: 85%;
    min-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 10px auto;
    padding: 10px;
    background-color: #f8f8f8;
    color: #5f5f5f;
    border-radius: 25px 25px 25px 0;
  }
  .messages__item > div {
    display: flex;
    flex-direction: column;
  }
  .me {
    border-radius: 25px 25px 0 25px;
    background-color: #e1eaf1;
    border: 1px solid rgb(224, 217, 217);
  }
  .avatar {
    background: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0;
  }
</style>
