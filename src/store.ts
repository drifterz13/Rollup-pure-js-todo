import { observable, action, autorun, toJS } from 'mobx'
import { TodoType } from './types'

let id = 1

export const todosMapId = observable<{ [id: string]: TodoType }>({
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

autorun(() => {
  console.log('todos', toJS(todosMapId))
})
