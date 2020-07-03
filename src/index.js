import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import './css/app.scss';
import { addButton, newTaskInput, newTaskPriority, deleteSelectedButton } from './js/elements';
import Task, { displayStoredTasks, deleteSelectedTasks } from './js/task';
import { onDownArrow, onUpArrow } from './js/select-item'

addButton.addEventListener('click', () => {
    addNewTaskToUI();
});

newTaskInput.addEventListener('keyup', event => {
    if (event.which === 13)
        addNewTaskToUI();
});

newTaskInput.addEventListener('focus', (event) => {
    let selected = document.querySelector('.todo-item.selected');
    if (selected) {
        selected.classList.remove('selected');
    }
});

const generateItemID = () => {
    return Math.random().toString(36).slice(2);
}

const addNewTaskToUI = () => {
    const value = newTaskInput.value;
    if (!value) return;
    const priority = newTaskPriority.value;
    new Task(value, priority, generateItemID());
};

document.addEventListener('DOMContentLoaded', (event) => {
    let todo_items_str = localStorage.getItem('todo-items')
    if (todo_items_str) {
        let todo_items = JSON.parse(todo_items_str);
        displayStoredTasks(todo_items);
    }
    newTaskInput.focus();
});

document.addEventListener('keydown', (event) => {
    if (event.target.type === 'text')
        return;
    if (event.which === 39 || event.which === 40) {
        // Right and down arrow action
        onDownArrow();
    } else if (event.which === 37 || event.which === 38) {
        // Left and Up arrow action
        onUpArrow();
    } else if (event.which === 46) {
        // delete the selected task by delete key board event
        deleteSelectedTasks('.todo-item.selected');
    }
});

deleteSelectedButton.addEventListener('click', () => {
    deleteSelectedTasks();
});

