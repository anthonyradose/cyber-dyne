// DOM elements
const userInput = document.querySelector(".userInput");
const addTaskButton = document.querySelector(".addTaskButton");
const prioritySelect = document.querySelector(".prioritySelect");

// Priority Enum
const PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};

// App state
const tasks = {
  notDoneList: [
    { text: "Surf The Net", id: 1, priority: PRIORITY.LOW },
    { text: "Order Pizza", id: 2, priority: PRIORITY.LOW },
    { text: "Prepare for Y2K", id: 3, priority: PRIORITY.LOW },
    { text: "Hack The Mainframe tonight...", id: 4, priority: PRIORITY.MEDIUM },
    { text: "Return movies to Blockbuster", id: 5, priority: PRIORITY.MEDIUM },
    { text: "Buy a Cellphone", id: 6, priority: PRIORITY.HIGH },
    { text: "Record X-Files", id: 7, priority: PRIORITY.HIGH },
  ],
  doneList: [],
};

// Utility functions
const updateList = (item, list) => list.filter((el) => el.id !== item.id);

// Function to render tasks
const createTaskItem = (item, isCompleted) => {
  const listItem = document.createElement("li");
  listItem.classList.add("task-item");
  
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");

  const textDiv = document.createElement("div");
  textDiv.textContent = item.text;
  textDiv.classList.add("text");

  const priorityDiv = document.createElement("div");
  priorityDiv.textContent = `[PRIORITY: ${item.priority}]`;
  priorityDiv.classList.add("priority");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const delButton = document.createElement("button");
  delButton.textContent = "DELETE";
  delButton.addEventListener("click", () => {
    if (isCompleted) {
      tasks.doneList = updateList(item, tasks.doneList);
    } else {
      tasks.notDoneList = updateList(item, tasks.notDoneList);
    }
    renderLists();
  });

  buttonContainer.appendChild(delButton);

  if (!isCompleted) {
    const doneButton = document.createElement("button");
    doneButton.textContent = "DONE";
    doneButton.addEventListener("click", () => {
      item.date = new Date().toLocaleString("en-GB", { timeZone: "UTC" });
      tasks.notDoneList = updateList(item, tasks.notDoneList);
      tasks.doneList.push(item);
      renderLists();
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
const renderLists = () => {
  const notDoneContainer = document.querySelector(".notDoneUl");
  const doneContainer = document.querySelector(".doneUl");

  notDoneContainer.textContent = "";
  doneContainer.textContent = "";

  tasks.notDoneList.forEach((item) => {
    const taskItem = createTaskItem(item, false);
    notDoneContainer.appendChild(taskItem);
  });

  tasks.doneList.forEach((item) => {
    const taskItem = createTaskItem(item, true);
    doneContainer.appendChild(taskItem);
  });
};

// Function to add new task
const addTask = () => {
  if (userInput.value.trim()) {
    const newTask = {
      text: userInput.value,
      id: Date.now(),
      priority: prioritySelect.value,
    };
    tasks.notDoneList.push(newTask);
    userInput.value = "";
    renderLists();
  }
};

// Event listener for Add Task button
addTaskButton.addEventListener("click", addTask);

// Initial render
renderLists();

// Clock functionality
const showTime = () => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  document.getElementById("myClockDisplay").textContent = time;
  setTimeout(showTime, 1000);
};

showTime();
