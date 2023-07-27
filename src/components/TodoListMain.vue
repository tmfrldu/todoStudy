₩``<template>
  <todo-list-menu v-on:change-filter="onChangeFilter" class="p-0" />
  <div v-for="key in Object.keys(filtered_todos)" :key="key" class="mb-3">
    <div v-if="use_category">
      <em>{{ key }}</em>
    </div>
    <todo-list :data="filtered_todos[key] as Todo[]" />
  </div>
  <div class="my-2 mt-5">
    <span style="background-color: red;">&nbsp;</span>&nbsp;
    <strong>처리하지 못한 작업들</strong>
  </div>
  <todo-list :data="pending_todos" />
</template>

<script lang="ts">
export default {
  name: 'TodoListMain',
}
</script>

<script setup lang="ts">
import { Ref, ref, provide, inject, watch } from "vue";
import { useFilter } from "../compositions/filters";

import TodoListMenu from "./TodoListMenu.vue";
import TodoList from "./TodoList.vue";
const {
  getPendingTodos,
  getActiveTodayTodos,
  getCompletedTodayTodos,
  getAllTodayTodos,
  getAllTodos,
} = useFilter()
const filter = ref<number>(0)
const filtered_todos = ref<{ [key: string]: Todo[] }>({})
const pending_todos = ref<Todo[]>([])
const use_category = ref<boolean>(false)
// const todos = inject<Todo[]>('todos00')!
const todos = inject<Ref<Todo[]>>('todos00')!

console.log(todos.value);

console.log("todos", todos);
console.log("type", typeof todos);
// console.log("type[0]", typeof todos[0]); 


// todos.forEach( (data) => console.log(data))



interface Filter {
  str: string;
  func: (todos: Ref<Todo[]>) => Todo[];
  category: boolean;
}

const filters: Record<string, Filter> = {
  "0": {
    str: '해야 할 작업들',
    func: getActiveTodayTodos,
    category: false,
  },
  "1": {
    str: '완료한 작업들',
    func: getCompletedTodayTodos,
    category: false,
  },
  "2": {
    str: '오늘의 모든 기록',
    func: getAllTodayTodos,
    category: false,
  },
  "3": {
    str: '모든 작업',
    func: getAllTodos,
    category: false,
  },
}
provide('filters', filters)

const groupBy = (todos: Todo[]) => {
  return todos.reduce((acc, cur) => {
    acc[cur['date']] = acc[cur['date']] || []
    acc[cur['date']].push(cur)
    return acc
  }, {} as { [key: string]: Todo[] })
}

const onChangeFilter = (filter_idx: number) => {
  filter.value = Number(filter_idx)
}


watch(
  [() => filter.value, todos.value],
  ([new_filter, new_todos], [old_filter, old_todos]) => {
    pending_todos.value = getPendingTodos(todos)
    if (typeof new_filter != 'undefined') {
      let temp_todos = filters[new_filter].func(todos)
      filtered_todos.value = groupBy(temp_todos)
      use_category.value = filters[new_filter].category
    }
  },
  { immediate: true }
)
  

</script>

