import './css/style.css'
import { autorun } from 'mobx'
import { Todo } from './component/Todo'
import { TodoInput } from './component/TodoInput'
import { changeFilter, filteredTodos, selectedFilter } from './store'
import { FilterType } from './types'

createNavbar()
createSection()

function createNavbar() {
  const app = document.getElementById('app')
  const navbar = document.createElement('div')
  navbar.className = `bg-gray-50`

  navbar.innerHTML = `
    <div class="px-4 py-4 mx-auto">
      <div class="text-xl font-bold">Pure JS</div>
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

  const filters = createFilters()
  section.appendChild(filters)
  const todoInput = new TodoInput()
  section.appendChild(todoInput.el)
  section.appendChild(todosEl)

  app.appendChild(section)
}

function createFilters() {
  const filtersEl = document.createElement('div')
  filtersEl.className = `app-filters my-4`
  filtersEl.innerHTML = `
    <span data-filter-type="all" class="app-filter mr-2 hover:text-red-400 cursor-pointer">All</span> |
    <span data-filter-type="incomplete" class="app-filter mx-2 hover:text-red-400 cursor-pointer">Incomplete</span> |
    <span data-filter-type="completed" class="app-filter ml-2 hover:text-red-400 cursor-pointer">Completed</span>
  `

  filtersEl.querySelectorAll('.app-filter').forEach((el: HTMLSpanElement) => {
    const filterType = el.getAttribute('data-filter-type') as FilterType
    el.addEventListener('click', () => {
      changeFilter(filterType)
    })
  })
  return filtersEl
}

autorun(() => {
  const todos = filteredTodos.get()
  let todoFragment = document.createDocumentFragment()

  for (const todo of todos) {
    const todoInstance = new Todo(todo)
    todoFragment.appendChild(todoInstance.el)
  }

  const todosEl = document.querySelector('.app-todos')
  while (todosEl.firstChild) {
    todosEl.removeChild(todosEl.firstChild)
  }
  todosEl.appendChild(todoFragment)
})

autorun(() => {
  const filter = selectedFilter.get()
  const filtersEl = document.querySelector('.app-filters')
  for (const filterEl of filtersEl.children) {
    const filterType = filterEl.getAttribute('data-filter-type')
    if (!filterType) {
      continue
    }
    if (filterType === filter) {
      filterEl.classList.add('text-red-400')
    } else {
      filterEl.classList.remove('text-red-400')
    }
  }
})
