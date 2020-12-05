import './css/style.css'
import { autorun, toJS } from 'mobx'
import { Todo } from './component/Todo'
import { TodoInput } from './component/TodoInput'
import { todosMapId } from './store'

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

  const todoInput = new TodoInput()
  section.appendChild(todoInput.el)
  section.appendChild(todosEl)

  app.appendChild(section)
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
