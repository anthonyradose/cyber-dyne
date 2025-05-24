// DOM elements
const taskInput = document.querySelector(".task-input");
const addTaskButton = document.querySelector(".add-task-button");
const prioritySelect = document.querySelector(".priority-select");

// Priority Object
const PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};

// Initial Tasks
const tasks = {
  pendingTasks: [
    { text: "Surf The Net", id: 1, priority: PRIORITY.LOW },
    { text: "Order Pizza", id: 2, priority: PRIORITY.LOW },
    { text: "Prepare for Y2K", id: 3, priority: PRIORITY.LOW },
    { text: "Hack The Mainframe tonight...", id: 4, priority: PRIORITY.MEDIUM },
    { text: "Return movies to Blockbuster", id: 5, priority: PRIORITY.MEDIUM },
    { text: "Buy a Cellphone", id: 6, priority: PRIORITY.HIGH },
    { text: "Record X-Files", id: 7, priority: PRIORITY.HIGH },
  ],
  completedTasks: [],
};

// Utility functions
const removeTaskFromList = (item, list) => list.filter((el) => el.id !== item.id);

// Function to render tasks
const createTaskElement = (item, isCompleted) => {
  const listItem = document.createElement("li");
  listItem.classList.add("task-item");
  
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("task-item-wrapper");

  const textDiv = document.createElement("div");
  textDiv.textContent = item.text;
  textDiv.classList.add("task-text");

  const priorityDiv = document.createElement("div");
  priorityDiv.textContent = `[PRIORITY: ${item.priority}]`;
  priorityDiv.classList.add("priority");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("task-actions");

  const delButton = document.createElement("button");
  delButton.textContent = "DELETE";
  delButton.addEventListener("click", () => {
    if (isCompleted) {
      tasks.completedTasks = removeTaskFromList(item, tasks.completedTasks);
    } else {
      tasks.pendingTasks = removeTaskFromList(item, tasks.pendingTasks);
    }
    renderTaskLists();
  });

  buttonContainer.appendChild(delButton);

  if (!isCompleted) {
    const doneButton = document.createElement("button");
    doneButton.textContent = "DONE";
    doneButton.addEventListener("click", () => {
      item.date = new Date().toLocaleString("en-GB", { timeZone: "UTC" });
      tasks.pendingTasks = removeTaskFromList(item, tasks.pendingTasks);
      tasks.completedTasks.push(item);
      renderTaskLists();
    });
    buttonContainer.appendChild(doneButton);
  } else {
    listItem.textContent += ` [Completed: ${item.date}]`;
  }

  itemContainer.appendChild(textDiv);
  itemContainer.appendChild(priorityDiv);
  itemContainer.appendChild(buttonContainer);
  listItem.appendChild(itemContainer);

  return listItem;
};

// Function to render both lists
const renderTaskLists = () => {
  const pendingTasksList = document.getElementById("pending-tasks");
  const completedTasksList = document.getElementById("completed-tasks");

  pendingTasksList.textContent = "";
  completedTasksList.textContent = "";

  tasks.pendingTasks.forEach((item) => {
    const taskItem = createTaskElement(item, false);
    pendingTasksList.appendChild(taskItem);
  });

  tasks.completedTasks.forEach((item) => {
    const taskItem = createTaskElement(item, true);
    completedTasksList.appendChild(taskItem);
  });
};

// Function to handle task submission
const handleTaskSubmit = () => {
  if (taskInput.value.trim()) {
    const newTask = {
      text: taskInput.value,
      id: Date.now(),
      priority: prioritySelect.value,
    };
    tasks.pendingTasks.push(newTask);
    taskInput.value = "";
    renderTaskLists();
  }
};

// Event listener for Add Task button
addTaskButton.addEventListener("click", handleTaskSubmit);

// Initial render
renderTaskLists();

// Clock functionality
const updateClock = () => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  document.getElementById("clock-display").textContent = time;
  setTimeout(updateClock, 1000);
};

updateClock(); 