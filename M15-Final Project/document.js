document.addEventListener('DOMContentLoaded', () => {

    // declaring DOM elements.
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('task');
    const prioritySelect = document.getElementById('priority');
    const importantCheckbox = document.getElementById('important');
    const taskManagerDiv = document.getElementById('taskmanager');

    //Declaring list and id variable.
    let tasks = [];
    let nextId = 1;

    // render all tasks into the task manager area.
    function renderTasks() {
        taskManagerDiv.innerHTML = '';

        //
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');

            // creates a new classes base on priority, importance, and completeion.
            taskDiv.className = `task priority-${task.priority.toLowerCase()} ${task.isImportant ? 'important' : ''} ${task.isCompleted ? 'completed' : ''}`;

            //if statements for both if the task is important and if the  done checkbox has been checked.
            if (task.isImportant) {
                taskDiv.style.borderLeft = '5px solid red';
                taskDiv.style.fontWeight = 'bold';
            }
            if (task.isCompleted) {
                taskDiv.style.textDecoration = 'line-through';
                taskDiv.style.opacity = '0.5';
            }

            // task html structure (including the checjbox and delete button)
            taskDiv.innerHTML = `
                <span class="task-name">${task.name}</span>
                <span class="task-meta">(Priority: ${task.priority} | ${task.date})</span>
                <label>
                    <input type="checkbox" class="toggle-complete" data-id="${task.id}" ${task.isCompleted ? 'checked' : ''}>
                    Done
                </label>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            `;

            //adds taskDiv to taskmanagerDiv
            taskManagerDiv.appendChild(taskDiv);
        });
    }
   // Handles "Done" checkbox changes to mark tasks as completed
    taskManagerDiv.addEventListener('change', function(event) {
        if (event.target.classList.contains('toggle-complete')) {
            const id = Number(event.target.dataset.id);
            const task = tasks.find(task => task.id === id);
            if (task) {
                task.isCompleted = event.target.checked;
                renderTasks();
            }
        }
    });

    // Handles deletion when Delete button is clicked
    taskManagerDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const id = Number(event.target.dataset.id);
            tasks = tasks.filter(task => task.id !== id);
            renderTasks();
        }
    });
    
    // what happens if the user preses 'Add task'
    taskForm.addEventListener('submit', function(event) {

        //prevents the program from reloading everytime user preses add task
        event.preventDefault();

        //declaring constant for the input name
        const name = taskInput.value.trim();

        //declaring a new task object
        const newTask = {
            id: nextId++,
            name: name,
            priority: prioritySelect.value,
            isImportant: importantCheckbox.checked,
            isCompleted: false,
            date: new Date().toLocaleDateString()
        };
        //adding  newtask to the task variable.
        tasks.push(newTask);

        //logging the task to the console log
        console.log(JSON.stringify(newTask));
        
        //then displays the task (calling the function )
        renderTasks();

        //resets the taskform for user to input new task
        taskInput.value = '';
        prioritySelect.value = 'High';
        importantCheckbox.checked = false;
    });

    // intialization render.
    renderTasks();
});