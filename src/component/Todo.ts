import { removeTodo, updateTodo } from '../store'
import { TodoType } from '../types'

export class Todo {
  title: string
  done: boolean
  id: number
  el = document.createElement('div')

  constructor(todo: TodoType) {
    this.title = todo.title
    this.done = todo.done
    this.id = todo.id

    this.el.className = `app-todo p-4 shadow-md mb-2 bg-white border-rounded`
    this.el.innerHTML = `
      <div class="app-remove-todo text-red-400 float-right cursor-pointer">X</div>
      <div>
        <span class="font-bold">Title: </span> <span class="app-todo-title" contenteditable>${
          todo.title
        }</span>
      </div>
      <div>
        <span class="font-bold">Status: </span> ${
          todo.done ? 'done' : 'not done'
        }
      </div>
    `

    const todoTitleEl: HTMLSpanElement = this.el.querySelector(
      '.app-todo-title'
    )
    todoTitleEl.addEventListener('blur', (e) => {
      const todo = {
        id: this.id,
        title: todoTitleEl.innerText,
        done: this.done,
      }
      updateTodo(todo)
    })
    todoTitleEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const todo = {
          id: this.id,
          title: todoTitleEl.innerText,
          done: this.done,
        }
        updateTodo(todo)
      }
    })

    const removeTodoEl: HTMLDivElement = this.el.querySelector(
      '.app-remove-todo'
    )
    removeTodoEl.addEventListener('click', () => {
      removeTodo(Number(this.id))
    })
  }
}
