import { removeTodo, updateTodo } from '../store'
import { TodoType } from '../types'

export class Todo {
  todo: TodoType
  el = document.createElement('div')

  constructor(todo: TodoType) {
    this.todo = todo

    this.el.className = `app-todo p-4 shadow-md mb-2 bg-white border-rounded grid grid-rows-3 grid-cols-2`
    this.el.innerHTML = `
      <input type="checkbox" ${this.todo.done ? 'checked' : ''} />
      <div class="app-remove-todo grid justify-end cursor-pointer">
        <div class="text-red-400 px-2">x</div>
      </div>
      <p class="app-todo-title col-span-2 ${
        this.todo.done ? 'line-through' : ''
      }" contenteditable> ${todo.title}</p>
      <div class="col-span-2">
        <span class="font-bold">Status: </span> ${
          todo.done ? 'done' : 'not done'
        }
      </div>
    `

    // Editable title
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

    // Remove button
    const removeTodoEl: HTMLDivElement = this.el.querySelector(
      '.app-remove-todo'
    )
    removeTodoEl.addEventListener('click', () => {
      removeTodo(this.todo.id)
    })

    // Checkbox
    const checkboxEl: HTMLInputElement = this.el.querySelector(
      `input[type="checkbox"]`
    )
    checkboxEl.addEventListener('change', () => {
      updateTodo({ ...this.todo, done: !this.todo.done })
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
