const todoDiv = document.querySelector(".todo");
const todoSpan = document.querySelector(".todo-span");
const todoInput = document.querySelector(".todo-input");
let todoResult, todoResultSpan, checkBtn, deleteBtn;

function checkUserLs() {
  return localStorage.getItem("user") != null;
}

function getTodoInput() {
  if (todoInput.value !== "") return todoInput.value;
}

function toggleTodoInputSec() {
  todoInput.value = "";
  todoDiv.classList.toggle("hidden");
}

function addTodo(todo) {
  const mainDiv = document.querySelector(".main");
  mainDiv.insertAdjacentHTML(
    "beforeend",
    `<div class='todo-result'><span class='today-span'>TODAY</span><span class='todo-result-span'>${todo}<button class="check-button"><i class="far fa-check-circle"></button></i><button class="delete-button"><i class="far fa-trash-alt"></i></i></button></span></div>`
  );
  todoResult = document.querySelector(".todo-result");
  todoResultSpan = document.querySelector(".todo-result-span");
  checkBtn = document.querySelector(".check-button");
  deleteBtn = document.querySelector(".delete-button");
}

function saveTodo(todo) {
  localStorage.setItem("todo", todo);
}

function getTodoLs() {
  return localStorage.getItem("todo");
}

function saveCheck() {
  localStorage.setItem("check", "false");
}

function toggleCheck() {
  todoResultSpan.classList.toggle("check");
  localStorage.getItem("check") === "true"
    ? localStorage.setItem("check", "false")
    : localStorage.setItem("check", "true");
}

function checkCheck() {
  if (localStorage.getItem("check") === "true")
    todoResultSpan.classList.add("check");
}

function deleteTodo() {
  todoResult.parentNode.removeChild(todoResult);
  localStorage.removeItem("todo");
  localStorage.removeItem("check");
  toggleTodoInputSec();
}

function todosInit() {
  // if todo is in l.s.
  // get todo from l.s.
  const todo = getTodoLs();
  // get rid of todo input section
  toggleTodoInputSec();
  // add todo result element
  addTodo(todo);
  // line through if already checked
  checkCheck();

  // add btn event listeners
  checkBtn.addEventListener("click", toggleCheck);
  deleteBtn.addEventListener("click", () => {
    deleteTodo();
    location.reload();
  });
}

window.addEventListener("load", () => {
  // show todo section only if there's user name info in l.s.
  toggleTodoInputSec();
  if (checkUserLs()) {
    toggleTodoInputSec();
    // if in ls do init
    if (getTodoLs()) {
      console.log("1");
      todosInit();
    } else {
      console.log("2");
      // if todo not in l.s. listen for enter, check if user inpt is not empty
      document.addEventListener("keypress", (event) => {
        if (
          event.key === "Enter" &&
          event.target === todoInput &&
          event.target.value !== ""
        ) {
          // get input
          const todo = getTodoInput();
          // save todo to l.s.
          saveTodo(todo);
          todosInit();
        }
      });
    }
  }
});
