describe('', () => {
    beforeEach(() => {
        document.body.innerHTML = `<div class="container">
                                        <div class="header">
                                        <h1>My To-do List</h1>
                                        </div>
                                        <div class="new-task-container">
                                        <div>
                                            <select id="task-priority" class="task-priority">
                                            <option value="p0" selected>Critical</option>
                                            <option value="p1">High</option>
                                            <option value="p2">Medium</option>
                                            <option value="p3">Low</option>
                                            </select>
                                        </div>
                                        <div>
                                            <input type="text" id="task-name" class="task-input" placeholder="Task Name">
                                        </div>
                                        <div>
                                            <button type="button" id="add-btn" class="btn add-btn">
                                            <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        </div>
                                        <div class="todo-list-container">
                                        <div class="delete-all">
                                            <button id="deleteSelected" class="btn" title="Delete selected">
                                            <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                        <ul class="todo-list">
                                        </ul>
                                        </div>
                                    </div>`;
    });
    test('First test ', () => {
        const newTaskInput = document.querySelector('#task-name');
         const newTaskPriority = document.querySelector('#task-priority');
        const addButton = document.querySelector('#add-btn');
        const todoContainer = document.querySelector('.todo-list-container');
        const todoListElement = document.querySelector('.todo-list');
        expect(newTaskInput).toBeTruthy();
        expect(newTaskPriority).toBeTruthy();
        expect(addButton).toBeTruthy();
        expect(todoContainer).toBeTruthy();
        expect(todoListElement).toBeTruthy(); 
    })
});

