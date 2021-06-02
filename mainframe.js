const input = document.querySelector('input');
const btn = document.querySelector('add-task');

btn.addEventListener('click', addList)

function addList(e) {
  console.log('YOHANS YALALALALALALALALALALALALALALALALALALALA');
  const notCompleted = document.querySelector('.not-done');
  const completed = document.querySelector('.done');

  const newLi = createElement('li');
  const checkBtn = createElement('button');
  const delBtn = createElement('button');

  // checkBtn.innerHTML = '<i class="fa fa-check"></i>'
  // delBtn.innerHTML = '<i class="fa fa-trash"></i>'

  if (input.value !== '') {
    newLi.textContent = input.value;
    input.value = '';
    notCompleted.appendChild(newLi);
  }

  checkBtn.addEventListener('click', function() {
    const parent = this.parentNode;
    parent.remove();
  })

};
