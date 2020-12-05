import { observable, action, autorun, toJS, computed } from 'mobx'
import { FilterType, TodoType } from './types'

let id = 1

const todosMapId = observable<{ [id: string]: TodoType }>({
  1: {
    id: 1,
    title: 'Learn Javascript.',
    done: false,
  },
})

export function addTodo(title: string) {
  action((state) => {
    id += 1
    state[id] = {
      id,
      title,
      done: false,
    }
  })(todosMapId)
}

export function updateTodo(todo: TodoType) {
  action((state) => {
    state[todo.id].title = todo.title
    state[todo.id].done = todo.done
  })(todosMapId)
}

export function removeTodo(id: number) {
  action((state) => {
    delete state[id]
  })(todosMapId)
}

export const selectedFilter = observable.box<FilterType>('all')

export function changeFilter(filter: FilterType) {
  selectedFilter.set(filter)
}

export const filteredTodos = computed(() => {
  const filter = selectedFilter.get()
  const todos = Object.keys(todosMapId).map((id) => todosMapId[id])
  if (filter === 'all') {
    return todos
  }
  if (filter === 'completed') {
    return todos.filter((todo) => todo.done)
  }
  if (filter === 'incomplete') {
    return todos.filter((todo) => !todo.done)
  }
})

autorun(() => {
  console.log('todos', toJS(todosMapId))
})

autorun(() => {
  console.log('selected filter', selectedFilter.get())
})
