import { useForm } from "@mantine/form";
import { Button, Modal, Box, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Todo } from "../App";
import { KeyedMutator } from "swr";
import todoService from "../services/todo";
function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: { title: "", body: "" },
    validate: {
      title: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      body: (value) =>
        value.length < 2 ? "Body must have at least 2 letters" : null,
    },
  });
  async function addTodo({ title, body }: { title: string; body: string }) {
    const updated = await todoService.createTodo({ title, body });
    mutate(updated);
    close();
    form.reset();
  }
  return (
    <>
      <Modal
        radius="md"
        opened={opened}
        onClose={close}
        title="Add new TODO !"
        centered
      >
        <Box maw={340} mx="auto">
          <form onSubmit={form.onSubmit(addTodo)}>
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
            <Button type="submit" mt="sm" color="lime">
              Create
            </Button>
          </form>
        </Box>
      </Modal>

      <Button color="cyan" size="md" variant="light" onClick={open}>
        Add Todo
      </Button>
    </>
  );
}
export default AddTodo;
