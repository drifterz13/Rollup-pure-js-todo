import { removeTodo, updateTodo } from '../store'
import { TodoType } from '../types'

export class Todo {
  todo: TodoType
  el = document.createElement('div')
  checkbox: TodoCheckbox

  constructor(todo: TodoType) {
    this.todo = todo
    this.checkbox = new TodoCheckbox(todo)

    this.el.className = `app-todo p-4 shadow-md mb-2 bg-white border-rounded`
    this.el.innerHTML = `
      <div class="app-remove-todo text-red-400 float-right cursor-pointer">x</div>
      <p class="app-todo-title ${
        this.todo.done ? 'line-through' : ''
      }" contenteditable> ${todo.title}</p>
      <div>
        <span class="font-bold">Status: </span> ${
          todo.done ? 'done' : 'not done'
        }
      </div>
    `
    this.el.insertBefore(this.checkbox.el, this.el.firstChild)

    const todoTitleEl: HTMLSpanElement = this.el.querySelector(
      '.app-todo-title'
    )
    todoTitleEl.addEventListener('blur', () => {
      this.updateTitle(todoTitleEl.innerText)
    })
    todoTitleEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.updateTitle(todoTitleEl.innerText)
      }
    })

    const removeTodoEl: HTMLDivElement = this.el.querySelector(
      '.app-remove-todo'
    )
    removeTodoEl.addEventListener('click', () => {
      removeTodo(this.todo.id)
    })
  }

  updateTitle(title: string) {
    const todo = {
      ...this.todo,
      title,
    }
    updateTodo(todo)
  }
}

class TodoCheckbox {
  el = document.createElement('input')
  todo: TodoType

  constructor(todo: TodoType) {
    this.todo = todo
    this.el.setAttribute('type', 'checkbox')
    this.el.checked = todo.done

    this.el.addEventListener('change', (e) => {
      this.el.checked = !this.el.checked
      this.toggleComplete()
    })
  }

  toggleComplete() {
    updateTodo({ ...this.todo, done: !this.todo.done })
  }
}
