<template>
  <div>
    <h5 class="text-h5">Todos list</h5>
    <div v-if="loadingTodos">
      <v-skeleton-loader
        class="py-3"
        v-for="n of 9"
        :key="n"
        loading
        type="list-item"
      ></v-skeleton-loader>
    </div>

    <div v-else-if="!selectedTodos.length">
      <v-card class="pa-4">
        <p>No todos to show</p>
      </v-card>
    </div>

    <v-list v-else dense>
      <v-list-item-group v-model="completed" multiple>
        <v-list-item
          v-for="todo of selectedTodos"
          :value="todo.id"
          :key="todo.id"
          @click="deleteTodo(todo.id)"
        >
          <template v-slot:default="{ active }">
            <v-list-item-content>
              <v-list-item-title v-text="todo.title"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Todos",

  data: () => ({
    completed: [],
  }),
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
  },
  computed: mapGetters(["allTodos", "loadingTodos", "selectedTodos"]),
  created() {
    if (!this.allTodos.length) {
      this.fetchTodos();
    }
  },
};
</script>

<style></style>
