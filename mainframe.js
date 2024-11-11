const input = document.querySelector("input");
const btn = document.querySelector(".addTaskForm > button");
const select = document.querySelector("select");

const PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};

let notDoneList = [
  {
    text: "Surf The Net",
    id: 1,
    priority: PRIORITY.LOW,
  },
  {
    text: "Order Pizza",
    id: 2,
    priority: PRIORITY.LOW,
  },
  {
    text: "Prepare for Y2K",
    id: 3,
    priority: PRIORITY.LOW,
  },
  {
    text: "Hack The Mainframe tonight...",
    id: 4,
    priority: PRIORITY.MEDIUM,
  },
  {
    text: "Return movies to Blockbuster",
    id: 5,
    priority: PRIORITY.MEDIUM,
  },
  {
    text: "Buy a Cellphone",
    id: 6,
    priority: PRIORITY.HIGH,
  },
  {
    text: "Record X-Files",
    id: 7,
    priority: PRIORITY.HIGH,
  },
];
let doneList = [];

// Function to mark an item as done
const markAsDone = (item) => {
  notDoneList = deleteItem(item, notDoneList);
  item.date = new Date().toLocaleString("en-GB", { timeZone: "UTC" });
  doneList.push(item);
};

// Function to delete an item from a list
const deleteItem = (item, list) =>
  list.filter((element) => element.id !== item.id);

// Function to create a list item for both not done and done lists
const createListItem = (item, isCompleted) => {
  const newListItem = document.createElement("li");
  const itemContainer = document.createElement("div");
  const textDiv = document.createElement("div");
  const priorityDiv = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const checkBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  textDiv.textContent = item.text;
  newListItem.appendChild(itemContainer);
  itemContainer.appendChild(textDiv);
  itemContainer.appendChild(priorityDiv);
  itemContainer.classList.add("itemContainer");
  textDiv.classList.add("textDiv");

  // Priority styling logic
  const priorityClass = `textPriority${
    item.priority.charAt(0) + item.priority.slice(1).toLowerCase()
  }`;
  textDiv.classList.add(priorityClass);
  priorityDiv.textContent = `[PRIORITY: ${item.priority}]`;
  priorityDiv.classList.add(priorityClass);

  if (!isCompleted) {
    // If the item is not yet completed, add Done and Delete buttons
    checkBtn.textContent = "DONE";
    delBtn.textContent = "DELETE";

    buttonContainer.appendChild(checkBtn);
    buttonContainer.appendChild(delBtn);
    itemContainer.appendChild(buttonContainer);

    // Event listeners for Done and Delete buttons
    checkBtn.addEventListener("click", () => {
      markAsDone(item);
      populateList();
    });

    delBtn.addEventListener("click", () => {
      notDoneList = deleteItem(item, notDoneList);
      populateList();
    });
  } else {
    // If the item is completed, show completion date and delete button
    delBtn.textContent = "DELETE";
    newListItem.textContent += ` [Date of completion: ${item.date}]`;
    newListItem.appendChild(delBtn);

    delBtn.addEventListener("click", () => {
      doneList = deleteItem(item, doneList);
      populateList();
    });
  }

  return newListItem;
};

// Function to populate both the not done and done lists
const populateList = () => {
  const notCompleted = document.querySelector(".notDoneUl");
  const completed = document.querySelector(".doneUl");

  // Clear the lists before rendering
  notCompleted.textContent = "";
  completed.textContent = "";

  // Populate the not completed list
  notDoneList.forEach((item) => {
    const newListItem = createListItem(item, false);
    notCompleted.appendChild(newListItem);
  });

  // Populate the completed list
  doneList.forEach((item) => {
    const newListItem = createListItem(item, true);
    completed.appendChild(newListItem);
  });
};

// Function to add a new task to the not done list
const addToList = () => {
  if (input.value !== "") {
    notDoneList.push({
      text: input.value,
      priority: select.value,
      id: notDoneList.length + 1,
    });
    input.value = "";
    populateList();
  }
};

// Event listener for the add task button
btn.addEventListener("click", addToList);

// Initial population of the lists
populateList();

// Function to display the current time
const showTime = () => {
  const date = new Date();
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  const time = `${h}:${m}:${s}`;
  document.getElementById("myClockDisplay").textContent = time;
  setTimeout(showTime, 1000);
};
showTime();
window.addEventListener("load", showTime);
