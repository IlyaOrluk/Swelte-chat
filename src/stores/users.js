import { get, writable } from "svelte/store";
export const users = writable([]);

export const changeNewMessagesTick = (name) => {
  const index = get(users).findIndex((u) => u.username === name);
  const messagesCount = !!get(users)[index].messages ? get(users)[index].messages : 0
  users.set([
    ...get(users).slice(0, index),
    {
      ...get(users)[index],
      messages: messagesCount+1,
    },
    ...get(users).slice(index + 1, get(users).length),
  ]);
};
