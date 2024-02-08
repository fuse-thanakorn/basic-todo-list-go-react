import { useForm } from "@mantine/form";
import { Button, Modal, Box, TextInput, Textarea } from "@mantine/core";
import { Todo } from "../App";
import { KeyedMutator } from "swr";
import todoService from "../services/todo";
function EditTodo({
  todo,
  isOpened,
  onClose,
  mutate,
}: {
  todo: Todo;
  onClose: (close: boolean) => void;
  isOpened: boolean;
  mutate: KeyedMutator<Todo[]>;
}) {
  const form = useForm({
    initialValues: { title: todo.title, body: todo.body },
    validate: {
      title: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      body: (value) =>
        value.length < 2 ? "Body must have at least 2 letters" : null,
    },
  });
  async function EditTodo({ title, body }: { title: string; body: string }) {
    const updated = await todoService.updateTodo({ id: todo.id, title, body });
    mutate(updated);
    onClose(!isOpened);
    form.reset();
  }
  async function deleteTodo(id: number) {
    const updated = await todoService.deleteTodo(id);
    mutate(updated);
    onClose(!isOpened);
    form.reset();
  }
  return (
    <>
      <Modal
        radius="md"
        opened={isOpened}
        onClose={() => onClose(!isOpened)}
        title="Edit TODO !"
        centered
      >
        <Box maw={340} mx="auto">
          <form onSubmit={form.onSubmit(EditTodo)}>
            <TextInput
              label="Title"
              placeholder="Title"
              {...form.getInputProps("title")}
            />
            <Textarea
              mt="sm"
              label="Description"
              placeholder="Description"
              {...form.getInputProps("body")}
            />
            <Button type="submit" mt="sm" fullWidth color="lime">
              Update Todo
            </Button>
            <Button
              color="red"
              mt="sm"
              variant="outline"
              fullWidth
              onClick={() => deleteTodo(todo.id)}
            >
              Delete Todo
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
export default EditTodo;
