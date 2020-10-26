<template>
  <form @submit.prevent="onSubmit">
    <v-row>
      <v-col>
        <v-text-field
          v-model="title"
          label="Todo Description"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn color="primary" type="submit">Add</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTodo",
  data: () => ({
    title: "",
  }),
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit: function() {
      this.addTodo(this.title);
      this.title = "";
    },
  },
};
</script>

<style></style>
