const input = document.querySelector("input");
const btn = document.querySelector(".addTask > button");

let notDoneList = [
  {
    text: "Surf The Net",
    id: 1,
  },
  {
    text: "Order Pizza",
    id: 2,
  },
  {
    text: "Prepare for Y2K",
    id: 3,
  },
  {
    text: "Hack The Mainframe tonight...",
    id: 4,
  },
  {
    text: "Return movies to Blockbuster",
    id: 5,
  },
  {
    text: "Buy a Cellphone",
    id: 6,
  },
  {
    text: "Record X-Files",
    id: 7,
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
    const newListItem = document.createElement("li");
    const checkBtn = document.createElement("button");
    const delBtn = document.createElement("button");

    checkBtn.innerHTML = "Done";
    delBtn.innerHTML = "Delete";

    newListItem.textContent = item.text;
    newListItem.appendChild(checkBtn);
    newListItem.appendChild(delBtn);

    // Mark item as done
    checkBtn.addEventListener("click", function () {
      notDoneList = notDoneList.filter((element) => element.id !== item.id);
      doneList.push(item);
      populateList();
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

    delBtn.innerHTML = "delete";

    newListItem.textContent = item.text;
    newListItem.appendChild(delBtn);

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
      id: notDoneList.length + 1,
    });

    input.value = "";

    populateList();
  }
}

btn.addEventListener("click", addToList);

populateList();
