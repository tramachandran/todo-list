export const newTaskInput = document.querySelector('#task-name');
export const newTaskPriority = document.querySelector('#task-priority');
export const addButton = document.querySelector('#add-btn');
export const todoContainer = document.querySelector('.todo-list-container');
export const todoListElement = document.querySelector('.todo-list');
export const deleteSelectedButton = document.querySelector('#deleteSelected');
export const deleteAllElement = document.querySelector('.delete-all');

export const getAllTodoItemElements = () => {
    return todoListElement.querySelectorAll('.todo-item');
}