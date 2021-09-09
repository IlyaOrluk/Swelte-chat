export const changeArr = (arr, id, item) => {
    const itemId = arr.findIndex((i) => i.id === id)
    return [...arr.slice(0, itemId), item, ...arr.slice(itemId + 1, arr.length)]
}
