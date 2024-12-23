const taskForm = document.getElementById('taskForm');
const taskContainer = document.getElementById('taskContainer');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskEl = document.createElement('div');
        taskEl.classList.add('task', task.priority.toLowerCase());
        taskEl.innerHTML = `
            <span>${task.name} (Due: ${task.deadline})</span>
            <div>
                <button class="complete" data-index="${index}">✔</button>
                <button class="delete" data-index="${index}">✖</button>
            </div>`;
        taskContainer.appendChild(taskEl);
    });
    totalTasks.innerText = tasks.length;
    completedTasks.innerText = tasks.filter((t) => t.completed).length;
}

// Add Task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDeadline = document.getElementById('taskDeadline').value;
    const taskPriority = document.getElementById('taskPriority').value;

    tasks.push({ name: taskName, deadline: taskDeadline, priority: taskPriority, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    taskForm.reset();
});

// Handle Actions
taskContainer.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('delete')) {
        tasks.splice(index, 1);
    } else if (e.target.classList.contains('complete')) {
        tasks[index].completed = !tasks[index].completed;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
});


renderTasks();
