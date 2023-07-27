<template>
  <todo-list-new />
  <section class="container">
    <div class="row justify-content-center m-2">
      <todo-list-main />
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'TodoListContainer',
}
</script>

<script setup lang="ts">
import { ref,readonly, provide } from "vue";

import { useStorage } from "../compositions/storage";
import TodoListNew from "./TodoListNew.vue";
import TodoListMain from "./TodoListMain.vue";

// interface Todo {
//   id?: number;
//   job?: string;
//   completed?: boolean;
//   date?: string;
// }

const todos = ref<Todo[]>([]);
console.log("conatiner", todos);  
console.log("conatiner", typeof todos);


const { loadTodos, saveTodos, storage_id } = useStorage()

provide('todos00', readonly(todos))

const initTodos = (init_todos: Todo[]) => {
  todos.value = init_todos
}
const addTodo = (job: string, date: string) => {
  todos.value.push ({
    id: storage_id.value++,
    job: job,
    date: date,
    completed: false,
  })
  saveTodos(todos)
}
const removeTodo = (id: number) => {
  todos.value.splice(id, 1)
  todos.value.forEach((todo, idx) => {
    todo.id = idx
  })
  saveTodos(todos)
}
const completeTodo = (id: number) => {
  const todo = todos.value.find((todo) => todo.id == id)
  if (todo) {
    todo.completed = true
    saveTodos(todos)
  }
}

provide('addTodo', addTodo)
provide('removeTodo', removeTodo)
provide('completeTodo', completeTodo)

loadTodos(initTodos)
  
</script>
