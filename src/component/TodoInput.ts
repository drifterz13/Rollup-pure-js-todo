import { addTodo } from '../store'

export class TodoInput {
  value = ''
  el = document.createElement('input')

  constructor() {
    this.el.setAttribute('type', 'text')
    this.el.className =
      'app-todo-input w-full p-2 mb-4 border border-solid border-rounded'

    this.el.addEventListener('input', (e) => {
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
}
