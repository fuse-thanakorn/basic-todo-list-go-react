import { Container, Flex, Stack, Accordion, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItems";
import SelectComponent from "./components/SelectFilter";
import StatCard from "./components/Stats/StatsCard";
import { ENDPOINT } from "./services/todo";
import "./App.css";
import useSWR from "swr";
import { useState } from "react";
import EditTodo from "./components/EditTodo";
const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}
function App() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);
  const [filter, setFilter] = useState<string | null>(null);
  const [detailTodo, setDetailTodo] = useState<Todo>({});
  const [detailOpened, setDetailOpened] = useState<boolean>(false);
  function onDetailClick(todo: Todo) {
    setDetailTodo(todo);
    setDetailOpened(true);
  }
  const filteredData = data?.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "todo") return !todo.done;
    return true;
  });

  return (
    <Container size="responsive">
      <div>
        <h2> ✨ - TODO App - 🚀</h2>
        <Text c="dimmed" ta="center" fz="sm">
          Total todo tasks and their progress
        </Text>
      </div>
      <Flex
        mih={50}
        gap="lg"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <h2>Filter : </h2>
        <SelectComponent stateChanger={setFilter} value={filter} />
        <AddTodo mutate={mutate} />
        {detailOpened ? (
          <EditTodo
            todo={detailTodo}
            isOpened={detailOpened}
            onClose={setDetailOpened}
            mutate={mutate}
          />
        ) : null}
      </Flex>
      <Accordion variant="separated" mb={10} mt={5}>
        <Accordion.Item value="1" key="1">
          <Accordion.Control>
            ℹ️ - Want to see your progress ?{" "}
          </Accordion.Control>
          <Accordion.Panel>
            <StatCard todoList={data} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Stack>
        {filteredData?.map((todo, i) => (
          <TodoItem
            mutate={() => mutate()}
            onDetailClick={onDetailClick}
            key={i}
            id={todo.id}
            title={todo.title}
            body={todo.body}
            done={todo.done}
          />
        ))}
      </Stack>
    </Container>
  );
}

export default App;
