const input = document.querySelector("input");
const btn = document.querySelector(".add-task-div > button");
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
    // blockbuster
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

function populateList() {
  const notCompleted = document.querySelector(".not-done");
  const completed = document.querySelector(".done");

  // Clear all items in the lists before rendering the updated lists
  notCompleted.innerHTML = "";
  completed.innerHTML = "";

  notDoneList.forEach((item) => {
    const itemContainer = document.createElement("div");
    const textDiv = document.createElement("div")
    const priorityDiv = document.createElement("div")
    const newListItem = document.createElement("li");
    const buttonContainer = document.createElement("div");
    const checkBtn = document.createElement("button");
    const delBtn = document.createElement("button");

    checkBtn.innerHTML = "Done";
    delBtn.innerHTML = "Delete";

    textDiv.textContent = item.text;
    newListItem.appendChild(itemContainer);
    itemContainer.appendChild(textDiv);
    itemContainer.appendChild(priorityDiv);
    itemContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(checkBtn);
    buttonContainer.appendChild(delBtn);

    itemContainer.classList.add("itemContainer");
    textDiv.classList.add("text-div");

    switch (item.priority) {
      case PRIORITY.LOW:
        textDiv.classList.add("text-priority-low");
        priorityDiv.textContent = `[Priority: ${PRIORITY.LOW}]`;
        priorityDiv.classList.add("text-priority-low");
        break;
      case PRIORITY.MEDIUM:
        textDiv.classList.add("text-priority-medium");
        priorityDiv.textContent = `[Priority: ${PRIORITY.MEDIUM}]`;
        priorityDiv.classList.add("text-priority-medium");
        break;
      case PRIORITY.HIGH:
        textDiv.classList.add("text-priority-high");
        priorityDiv.textContent = `[Priority: ${PRIORITY.HIGH}]`;
        priorityDiv.classList.add("text-priority-high");
        break;
      default:
        textDiv.classList.add("text-priority-low");
        priorityDiv.textContent = `[Priority: ${PRIORITY.LOW}]`;
        priorityDiv.classList.add("text-priority-low");
    }

    // Mark item as done
    checkBtn.addEventListener("click", function () {
      notDoneList = notDoneList.filter((element) => element.id !== item.id);
      doneList.push(item);
      populateList();
      let d = new Date();
      let timestamp = d.getTime();
      const milliseconds = timestamp;
      const dateObject = new Date(milliseconds);
      const humanDateFormat = dateObject.toLocaleString("en-GB", {
        timeZone: "UTC",
      });
      console.log(humanDateFormat);
    });

    // Delete item
    delBtn.addEventListener("click", function () {
      notDoneList = notDoneList.filter((element) => element.id !== item.id);
      populateList();
    });

    notCompleted.appendChild(newListItem);
  });

  doneList.forEach((item) => {
    const newListItem = document.createElement("li");
    const delBtn = document.createElement("button");

    delBtn.innerHTML = "Delete";

    newListItem.textContent = item.text;
    newListItem.appendChild(delBtn);

    newListItem.classList.add("newListItem");
    delBtn.classList.add("delBtn");

    // Delete item
    delBtn.addEventListener("click", function () {
      doneList = doneList.filter((element) => element.id !== item.id);
      populateList();
    });

    completed.appendChild(newListItem);
  });
}

function addToList() {
  if (input.value !== "") {
    notDoneList.push({
      text: input.value,
      priority: select.value,
      id: notDoneList.length + 1,
    });

    input.value = "";

    populateList();
  }
}

btn.addEventListener("click", addToList);

populateList();

function showTime() {
  let date = new Date();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  let time = h + ":" + m + ":" + s;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);
}
showTime();

