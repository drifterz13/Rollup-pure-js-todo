import { autorun, toJS } from 'mobx'
import './css/style.css'
import { addTodo, removeTodo, todosMapId, updateTodo } from './store'
import { TodoType } from './types'

class TodoInput {
  private value = ''
  el = document.createElement('input')

  constructor() {
    this.el.setAttribute('type', 'text')
    this.el.className =
      'app-todo-input w-full p-2 mb-4 border border-solid border-rounded'

    this.el.addEventListener('input', (e) => {
      console.log('val', (e.target as HTMLInputElement).value)
      this.value = (e.target as HTMLInputElement).value
    })
    this.el.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        addTodo(this.value)
        this.value = ''
        this.el.value = ''
      }
    })
  }

  getValue() {
    return this.value
  }
}
const todoInput = new TodoInput()

createNavbar()
createSection()

function createNavbar() {
  const app = document.getElementById('app')
  const navbar = document.createElement('div')
  navbar.className = `bg-gray-50`

  navbar.innerHTML = `
    <div class="px-4 py-4 mx-auto">
      <div class="text-xl font-bold text-blue-400">Pure JS</div>
    </div>
  `
  app.appendChild(navbar)
}

function createSection() {
  const app = document.getElementById('app')
  const section = document.createElement('div')
  section.className = `app-section container mx-auto mt-6`

  const todosEl = document.createElement('div')
  todosEl.className = 'app-todos'

  section.appendChild(todoInput.el)
  section.appendChild(todosEl)

  app.appendChild(section)
}

class Todo {
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

autorun(() => {
  const allTodos = toJS(todosMapId)
  let todoFragment = document.createDocumentFragment()

  for (const id in allTodos) {
    const todo = new Todo(allTodos[id])
    todoFragment.appendChild(todo.el)
  }

  const todosEl = document.querySelector('.app-todos')
  while (todosEl.firstChild) {
    todosEl.removeChild(todosEl.firstChild)
  }

  todosEl.appendChild(todoFragment)
})
