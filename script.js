const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const filterPriority = document.getElementById('filterPriority');
const clearAllBtn = document.getElementById('clearAllBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const stats = document.getElementById('stats');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
displayTasks(tasks);

// إضافة مهمة
addTaskBtn.addEventListener('click', () => {
    if (taskInput.value.trim() === '') return;

    const task = {
        text: taskInput.value,
        date: taskDate.value,
        priority: taskPriority.value,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    displayTasks(tasks);

    taskInput.value = '';
    taskDate.value = '';
});

// بحث حي
searchInput.addEventListener('input', () => {
    filterAndDisplay();
});

// فلترة حسب الأولوية
filterPriority.addEventListener('change', () => {
    filterAndDisplay();
});

// مسح الكل
clearAllBtn.addEventListener('click', () => {
    tasks = [];
    saveTasks();
    displayTasks(tasks);
});

// الوضع الداكن
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// دوال المساعدة
function filterAndDisplay() {
    const searchTerm = searchInput.value.toLowerCase();
    const priorityFilter = filterPriority.value;

    let filtered = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm) &&
        (priorityFilter === 'all' || task.priority === priorityFilter)
    );

    displayTasks(filtered);
}

function displayTasks(taskArray) {
    taskList.innerHTML = '';
    taskArray.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add(task.priority);
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text} ${task.date ? `<small>(${task.date})</small>` : ''}</span>
            <div class="actions">
                <button class="complete-btn" onclick="toggleComplete(${index})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    stats.textContent = `Total: ${tasks.length} | Completed: ${tasks.filter(t => t.completed).length}`;
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    filterAndDisplay();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    filterAndDisplay();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
