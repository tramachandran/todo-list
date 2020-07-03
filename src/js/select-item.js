const selectorClassName = "selected";

const getTodoItems = () => {
    return document.querySelectorAll('.todo-item');
}

const getSelectedIndex = (items) => {
    if (items.length > 0) {
        // Converting nodelist to array to use findIndex method;
        const itemsArray = [...items];
        return itemsArray.findIndex(item => item.classList.contains(selectorClassName));
    }
    return -1;
}

export const onDownArrow = () => {
    let items = getTodoItems();
    if (items.length > 0) {
        let selectedItemindex = getSelectedIndex(items);
        if (selectedItemindex >= 0) {
            items[selectedItemindex].classList.remove(selectorClassName);
            let next = items[++selectedItemindex];
            if (next) {
                next.classList.add(selectorClassName);
                next.focus();
            } else {
                items[0].classList.add(selectorClassName);
                items[0].focus();
            }
        } else {
            items[0].classList.add(selectorClassName);
            items[0].focus();
        }
    }
}

export const onUpArrow = () => {
    let items = getTodoItems();
    if (items.length > 0) {
        let selectedItemindex = getSelectedIndex(items);
        if (selectedItemindex >= 0) {
            items[selectedItemindex].classList.remove(selectorClassName);
            let previous = items[--selectedItemindex];
            if (previous) {
                previous.classList.add(selectorClassName);
                previous.focus();
            } else {
                let lastIndex = items.length - 1;
                let lastItem = items[lastIndex];
                lastItem.classList.add(selectorClassName);
                lastItem.focus();
            }
        } else {
            let lastIndex = items.length - 1;
            let lastItem = items[lastIndex];
            lastItem.classList.add(selectorClassName);
            lastItem.focus();
        }
    }
}