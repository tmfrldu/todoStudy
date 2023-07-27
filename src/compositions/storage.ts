import { Ref, reactive, toRefs } from "vue";

interface StorageObject {
  storage_id: number;
}

// interface Todo {
//   id: number;
//   title?: string;
//   completed?: boolean;
//   job?: string
//   date?: string;
//   idx?: number;
// }

export const useStorage = () => {
  const KEY = 'my-todo-list';
  const storage_obj: StorageObject = reactive({ storage_id: 0 });
  
  const loadTodos = (initTodos: (todos: Todo[]) => void) => {
    let temp_todos: Todo[] = JSON.parse(localStorage.getItem(KEY) || '[]');
    temp_todos.forEach((todo, idx) => {
      todo.id = idx;
    });
    storage_obj.storage_id = temp_todos.length;
    initTodos(temp_todos);
  };
  
  const saveTodos = (todos: Ref<Todo[]>) => {
    localStorage.setItem(KEY, JSON.stringify(todos.value));
  };
  
  return {
    ...toRefs(storage_obj),
    loadTodos,
    saveTodos,
  };
};
