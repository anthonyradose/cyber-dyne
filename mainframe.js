const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');

btn.addEventListener('click', addList)

function addList(e) {
  const notCompleted = document.querySelector('.not-done');
  const completed = document.querySelector('.done');

  const newLi = document.createElement('li');
  const checkBtn = document.createElement('button');
  const delBtn = document.createElement('button');

  checkBtn.innerHTML = 'done'
  delBtn.innerHTML = 'delete'

  if (input.value !== '') {
    newLi.textContent = input.value;
    notCompleted.appendChild(newLi);
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);
  }

  checkBtn.addEventListener('click', function () {
    const parent = this.parentNode;
    parent.remove();
    completed.appendChild(parent);
    checkBtn.style.display = 'none';
  });

  delBtn.addEventListener('click', function () {
    const parent = this.parentNode;
    parent.remove();
  });

};
