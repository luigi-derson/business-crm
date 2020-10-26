import axios from "axios";
import selectTodos from "../../helpers/filters";

const state = {
  todos: [],
  loading: false,
  filteredTodos: [],
  filters: {
    text: "",
    status: "all",
  },
};

const getters = {
  allTodos: (state) => state.todos,
  loadingTodos: (state) => state.loading,
  textFilter: (state) => state.filters.text,
  selectedTodos: (state) => state.filteredTodos,
};

const actions = {
  async fetchTodos({ commit }) {
    commit("updateLoading", true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    if (response.data) {
      commit("setTodos", response.data);
      // commit("setFilteredTodos", response.data);
      commit("updateLoading", false);
    }
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title,
        completed: false,
      }
    );
    commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("removeTodo", id);
  },
  async limitTodos({ commit }, value) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${value}`
    );
    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, updatedTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo}`
    );

    commit("completeTodo", response.data);
  },
  async filterText({ commit, dispatch }, text) {
    await commit("setFilterText", text);
    dispatch("filterTodos");
  },
  async filterTodos({ commit }) {
    await commit("filterTodos");
  },
};

const mutations = {
  setFilterText: (state, text) => (state.filters.text = text),
  setFilteredTodos: (state, todos) => (state.filteredTodos = todos),
  filterTodos: (state) => {
    const todos = [...state.todos];
    state.filteredTodos = todos;
    state.filteredTodos = selectTodos(state.filters, todos);
  },
  updateLoading: (state, status) => (state.loading = status),
  setTodos: (state, todos) => {
    state.todos = todos;
    state.filteredTodos = todos;
  },
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  completeTodo: (state, updatedTodo) => {
    const index = state.todos.find((todo) => todo.id === updatedTodo.id);

    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
