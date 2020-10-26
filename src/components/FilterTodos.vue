<template>
  <v-row>
    <v-col>
      <v-select
        @change="limitTodos"
        :items="options"
        v-model="number"
        label="Show"
        outlined
      ></v-select>
    </v-col>
    <v-col>
      <v-text-field
        :value="textFilter"
        @input="handleSearch"
        label="Search..."
        required
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { debounce } from "../helpers/index";
export default {
  data: () => ({
    options: [
      { text: "How many to show?", value: "", disabled: true },
      "200",
      "100",
      "50",
      "20",
      "10",
      "5",
    ],
    number: "",
  }),
  computed: mapGetters(["textFilter"]),
  methods: {
    ...mapActions(["limitTodos", "filterText"]),
    handleSearch: debounce(function(text) {
      this.filterText(text);
    }, 500),
  },
};
</script>

<style></style>
