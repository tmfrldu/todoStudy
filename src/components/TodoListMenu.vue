<template>
  <div class="row">
    <div class="col">
      <span style="background-color: blue;">&nbsp;</span>&nbsp;
      <strong>{{ state }}</strong>

    </div>
    <div class="col">
      <div class="btn-group float-end">
        <button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          리스트 필터
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="key in Object.keys(filters)" :key="key">
            <a class="dropdown-item" @click="filter = key">
              {{ filters[key].str }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TodoListMenu',
}
</script>

<script setup lang="ts">
import { ref, watch, computed, inject } from "vue";

// filter 타입 정의
interface Filter {
  str: string;
  func: (todos: Todo[]) => Todo[];
  category: boolean;
}

const emit = defineEmits(['change-filter'])
const filters = inject<Record<string, Filter>>('filters')!; // inject에 대한 타입 정의와 함께 타입 어설션 추가
const filter = ref("0"); // filter를 string 타입으로 변경
const state = computed(() => {
      return filters[filter.value].str;
    });
    watch(
      () => filter.value,
      (filter) => {
        emit('change-filter', filter);
      }
    )
  
   
</script>
