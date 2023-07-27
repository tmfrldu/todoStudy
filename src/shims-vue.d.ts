declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare interface Todo {
  id: number;
  // title: string;
  job: string;
  completed: boolean;
  date: string;
}