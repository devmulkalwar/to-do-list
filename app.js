let todoList = [];

// Load todoList from localStorage on page load
window.onload = function () {
  let storedTodoList = localStorage.getItem('todoList');
  if (storedTodoList) {
    todoList = JSON.parse(storedTodoList);
    displayItems();
  }
}

function addTodo() {
  let inputElement = document.querySelector('#todo-input');
  let todoItem = inputElement.value;
  if (todoItem === "") {
    alert("Input field cannot be empty !!")
    return;
  }
  todoList.push({ item: todoItem, isChecked: false });

  // Save todoList to localStorage
  localStorage.setItem('todoList', JSON.stringify(todoList));

  inputElement.value = '';
  displayItems();
}

function editToDo(i) {
  let spanEle = document.getElementById(`id_${i}`);
  let userInput = prompt("Edit ToDo", spanEle.innerText);

  if (userInput !== "" && userInput !== null) {
    console.log('User input:', userInput);
    spanEle.innerText = userInput;
    todoList[i].item = userInput; // Update the item
    localStorage.setItem('todoList', JSON.stringify(todoList)); // Update localStorage
  }
}

function deleteToDo(i) {
  todoList.splice(i, 1);

  // Update todoList in localStorage after deletion
  localStorage.setItem('todoList', JSON.stringify(todoList));

  displayItems();
}

function checkItem(i) {
  let checkbox = document.getElementById(`chekbox_${i}`);
  todoList[i].isChecked = checkbox.checked; // Update the isChecked property

  // Update the display
  let spanEle = document.getElementById(`id_${i}`);
  spanEle.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

  // Update localStorage
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function displayItems() {
  let containerElement = document.querySelector('.todo-container');
  let newHtml = '';
  for (let i = 0; i < todoList.length; i++) {
    let { item, isChecked } = todoList[i];
    newHtml += `
      <li class="list-item">
        <input type="checkbox" class="check-box" id="chekbox_${i}" onchange="checkItem(${i})" ${isChecked ? 'checked' : ''}/>
        <span id="id_${i}" style="text-decoration: ${isChecked ? 'line-through' : 'none'};">${item}</span>
        <button class='btn-edit' onclick="editToDo(${i})">Edit</button>
        <button class='btn-delete' onclick="deleteToDo(${i})">Delete</button>
      </li>
    `;
  }
  containerElement.innerHTML = newHtml;
}
