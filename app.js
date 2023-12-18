let todoList = [];
let isChecked ;
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
  todoList.push({ item: todoItem });

  // Save todoList to localStorage
  localStorage.setItem('todoList', JSON.stringify(todoList));

  inputElement.value = '';
  displayItems();
}

function editToDo(i) {
  let spanEle = document.getElementById(`id_${i}`)
  let todoItem = spanEle.value;
  let userInput = prompt("Edit ToDo", todoItem);

  if (userInput !== "") {
    if (userInput !== null) {
      console.log('User input:', userInput);
      spanEle.innerText = userInput;
      todoList.splice(i, 1, { item: userInput });

      // Update todoList in localStorage after editing
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
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
  if (checkbox.checked) {
    let spanEle = document.getElementById(`id_${i}`);
    spanEle.style.textDecoration = 'line-through';
  }
  else {
    let spanEle = document.getElementById(`id_${i}`);
    spanEle.style.textDecoration = 'none';
  }
}

function displayItems() {
  let containerElement = document.querySelector('.todo-container');
  let newHtml = '';
  for (let i = 0; i < todoList.length; i++) {
    let { item } = todoList[i];
    newHtml += `
        <li class= "list-item" >
        <input type="checkbox" class="check-box" id="chekbox_${i}" onchange="checkItem(${i})"/>
        <span id = "id_${i}">${item}</span>
        <button class='btn-edit' onclick="editToDo(${i})">Edit</button>
        <button class='btn-delete' onclick="deleteToDo(${i})">Delete</button>
        </li>
      `;
  }
  containerElement.innerHTML = newHtml;
}