<template>
  <header>
    <hgroup class="my-5">
      <h1>나의 할일</h1>
      <em>{{ today }}</em>
    </hgroup>
  </header>
  <ToDoListContainer />
</template>

<script lang="ts">
export default {
  name: "App",
}

</script>

<script setup lang="ts">
import {  inject } from 'vue';
import ToDoListContainer from './components/ToDoListContainer.vue';

const today = inject('today')

</script>
<style scoped>
hgroup {
  text-align: center;
  font-family: 'Arial Bold';
}

hgroup h1 {
  font-weight: bolder;
}



</style>
