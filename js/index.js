import { taskInput, addTaskButton, prioritySelect } from './modules/dom.js';
import { handleTaskSubmit, renderTaskLists } from './modules/task.js';
import { initClock } from './modules/clock.js';

// Event listener for Add Task button
addTaskButton.addEventListener("click", () => handleTaskSubmit(taskInput, prioritySelect));

// Initial render
renderTaskLists();

// Initialize clock
initClock(); 