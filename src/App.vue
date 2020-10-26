<template>
  <v-app>
    <v-main>
      <v-container>
        <AddTodo />
        <FilterTodos />
        <Todos />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Todos from "./components/Todos.vue";
import AddTodo from "./components/AddTodo.vue";
import FilterTodos from "./components/FilterTodos.vue";

export default {
  name: "App",

  components: {
    Todos,
    AddTodo,
    FilterTodos,
  },

  data: () => ({
    //
  }),
};
</script>
