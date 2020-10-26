export default function(filter, todos) {
  let selectedTodos = [...todos];
  if (filter.text) {
    const searchTerm = filter.text.toLowerCase();

    selectedTodos = selectedTodos.filter((todo) => {
      return todo.title.toLowerCase().includes(searchTerm);
    });
  }

  return selectedTodos;
}
