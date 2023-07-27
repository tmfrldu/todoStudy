import { inject, Ref } from 'vue'

interface useFilter {
  today: string;
  fnSort: (a: Todo, b: Todo) => number;
  getPendingTodos: (todos: Ref<Todo[]>) => Todo[];
  getActiveTodayTodos: (todos: Ref<Todo[]>) => Todo[];
  getCompletedTodayTodos: (todos: Ref<Todo[]>) => Todo[];
  getAllTodayTodos: (todos: Ref<Todo[]>) => Todo[];
  getAllTodos: (todos: Ref<Todo[]>) => Todo[];
}

export const useFilter = (): useFilter => {
  const today = inject('today') as string;
  
  const fnSort = (a: Todo, b: Todo) => {
    const a_date = Date.parse(a.date);
    const b_date = Date.parse(b.date);
    if (a_date > b_date) return 1
    else if (a_date < b_date) return -1
    else return a.id - b.id
  }
  const getPendingTodos = (todos: Ref<Todo[]>) => {
    
    
    return todos.value.filter((todo: Todo) => todo.date < today && !todo.completed)
      .slice()
      .sort(fnSort)
  }

  const getActiveTodayTodos = (todos: Ref<Todo[]>) => {
    return todos.value
      .filter((todo:Todo) => todo.date == today && !todo.completed)
      .slice()
      .sort(fnSort)
  }

  const getCompletedTodayTodos = (todos: Ref<Todo[]>) => {
    return todos.value
      .filter((todo:Todo) => todo.date == today && todo.completed)
      .slice()
      .sort(fnSort)
  }

  const getAllTodayTodos = (todos: Ref<Todo[]>) => {
    return getActiveTodayTodos(todos)
      .concat(getCompletedTodayTodos(todos))
      .slice()
      .sort(fnSort)
  }

  const getAllTodos =  (todos: Ref<Todo[]>) => {
    return todos.value.slice().sort(fnSort)
  }

  return { today, fnSort,
    getPendingTodos,
    getActiveTodayTodos,
    getCompletedTodayTodos,
    getAllTodayTodos,
    getAllTodos,
  }
}
