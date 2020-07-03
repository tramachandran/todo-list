import { todoListElement, newTaskInput, todoContainer, deleteAllElement } from './elements';

const priorityTypes = {
    'p0': 'Critical',
    'p1': 'Hign',
    'p2': 'Medium',
    'p3': 'Low'
};

const checkedClass = 'checked';

let all_items = [];

export default class Task {
    constructor(name, priority, id) {
        this.addTask({ name, priority, id });
    }

    addTask(data) {
        let taskName = data.name;
        let priority = data.priority;
        let id = data.id;
        let newTaskDiv = document.createElement('div');
        newTaskDiv.classList.add('todo-item');
        let liElement = document.createElement('li');

        // Check box
        let divCheckBox = document.createElement('div');
        let checkBoxElement = document.createElement('input');
        checkBoxElement.type = 'checkbox';
        checkBoxElement.checked = false;
        checkBoxElement.addEventListener('change', (event) => {
            newTaskDiv.classList.toggle(checkedClass);
            showOrHideDeleteAll();
        });
        divCheckBox.appendChild(checkBoxElement)
        liElement.appendChild(divCheckBox);

        // Input box
        let divInputBox = document.createElement('div');
        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.disabled = true;
        inputElement.value = taskName;
        inputElement.addEventListener('keyup', event => {
            if (event.which === 13)
                this.saveRowData(newTaskDiv, event.target, id);
        });
        divInputBox.appendChild(inputElement)
        liElement.appendChild(divInputBox);

        // Priority data as class
        newTaskDiv.classList.add(priority);


        // Save button shows on dbl click
        let divSave = document.createElement('div');
        let saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.title = 'Save';
        saveButton.innerHTML = '<i class="fa fa-check"></i>';
        divSave.classList.add('btn', 'btn-save');
        saveButton.addEventListener('click', () => {
            this.saveRowData(newTaskDiv, inputElement, id);
        });
        divSave.appendChild(saveButton)
        liElement.appendChild(divSave);

        // Delete button hides on dbl click
        let divRemove = document.createElement('div');
        let deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.title = 'Remove';
        deleteButton.innerHTML = '<i class="fa fa-times"></i>';
        divRemove.classList.add('btn', 'btn-delete');
        deleteButton.addEventListener('click', () => {
            newTaskDiv.remove();
            let item_index = getIndex(id);
            all_items.splice(item_index, 1);
            updateLocalStorage();
            showOrHideDeleteAll();
            showOrHideTaskContainer();
        });
        divRemove.appendChild(deleteButton)
        liElement.appendChild(divRemove);

        newTaskDiv.setAttribute('id', id);

        // Double click event
        newTaskDiv.addEventListener('dblclick', (e) => {
            newTaskDiv.classList.add('disable');
            inputElement.disabled = false;
            inputElement.focus();
        });

        // Click event for selecting the item
        newTaskDiv.addEventListener('click', (e) => {
            if (e.target.type === 'checkbox') return;
            let selected = document.querySelector('.todo-item.selected');
            if (selected) {
                selected.classList.remove('selected');
            }
            newTaskDiv.classList.add('selected');
        });
        newTaskDiv.appendChild(liElement);
        todoListElement.appendChild(newTaskDiv);
        newTaskInput.value = "";
        todoContainer.classList.add('show');
        // Add the data to global list.
        all_items.push(data);
        updateLocalStorage();
    }

    saveRowData(taskDiv, inputElement, id) {
        let value = inputElement.value;
        if (!value)
            return;
        taskDiv.classList.remove('disable');
        inputElement.disabled = true;
        const item_index = getIndex(id);
        all_items[item_index].name = value;
        updateLocalStorage();
    }
}

const getIndex = (id) => {
    return all_items.findIndex((item => item.id === id));
}

export const displayStoredTasks = (task_items) => {
    for (const item of task_items) {
        const taskName = item.name;
        const id = item.id;
        const priority = item.priority;
        new Task(taskName, priority, id);
    }
}

const updateLocalStorage = () => {
    let allItemsData = JSON.stringify(all_items);
    localStorage.setItem('todo-items', allItemsData);
}

const getAllCheckedTasks = (selector) => {
    selector = selector || '.todo-item.checked';
    return document.querySelectorAll(selector);
}

export const deleteSelectedTasks = (selector) => {
    const checkedTodoItems = getAllCheckedTasks(selector);
    if (checkedTodoItems.length > 0) {
        for (const item of checkedTodoItems) {
            let id = item.getAttribute('id');
            let item_index = getIndex(id);
            all_items.splice(item_index, 1);
            item.remove();
        }
        updateLocalStorage();
        showOrHideDeleteAll();
        showOrHideTaskContainer();
    }
}

const showOrHideDeleteAll = () => {
    const checkedTodoItems = getAllCheckedTasks();
    if (checkedTodoItems.length > 0) {
        deleteAllElement.classList.add('show');
    } else {
        deleteAllElement.classList.remove('show');
    }
}

const showOrHideTaskContainer = () => {
    const allTodos = document.querySelectorAll('.todo-item');
    if (allTodos.length === 0) {
        todoContainer.classList.remove('show');
    }
    newTaskInput.focus();
}