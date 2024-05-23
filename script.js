let todos = [];
let nextId = 1;

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

// Load todos from Local Storage when the page loads
window.onload = function() {
  loadTodos();
  render();
  updateCounter();
}

function newTodo() {
  const text = prompt('Enter a new TODO:');
  if (text) {
    const todo = { id: nextId++, text: text, checked: false };
    todos.push(todo);
    saveTodos();
    render();
    updateCounter();
  }
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onclick="checkTodo(${todo.id})"/>
      <label for="${todo.id}"><span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
}

function updateCounter() {
  itemCountSpan.innerText = todos.length;
  uncheckedCountSpan.innerText = todos.filter(todo => !todo.checked).length;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
  updateCounter();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    saveTodos();
    render();
    updateCounter();
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('nextId', nextId.toString());
}

function loadTodos() {
  const todosString = localStorage.getItem('todos');
  const nextIdString = localStorage.getItem('nextId');
  if (todosString) {
    todos = JSON.parse(todosString);
  }
  if (nextIdString) {
    nextId = parseInt(nextIdString, 10);
  }
}
