export const ENDPOINT = "http://localhost:3000";
const todoService = {
  async changeTodoStatus(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return updated;
  },
  async updateTodo({
    id,
    title,
    body,
  }: {
    id: number;
    title: string;
    body: string;
  }) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    }).then((res) => res.json());
    return updated;
  },
  async deleteTodo(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return updated;
  },
  async createTodo(values: { title: string; body: string }) {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());
    return updated;
  },
};
export default todoService;
