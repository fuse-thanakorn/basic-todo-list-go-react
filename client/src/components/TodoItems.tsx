import classes from "../assets/CheckboxCard.module.css";
import {
  Text,
  Badge,
  Flex,
  Checkbox,
  UnstyledButton,
  Burger,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { Todo } from "../App";
import { KeyedMutator } from "swr";
import todoService from "../services/todo";
function TodoItem({
  mutate,
  onDetailClick,
  id,
  title,
  body,
  done,
}: {
  mutate: KeyedMutator<Todo[]>;
  onDetailClick: (todo: Todo) => void;
  id: number;
  title: string;
  body: string;
  done: boolean;
}) {
  const [opened] = useDisclosure();
  async function changeTodoStatus(id: number) {
    const updated = await todoService.changeTodoStatus(id);
    mutate(updated);
  }
  return (
    <UnstyledButton className={classes.button}>
      <Flex align="center" justify="flex-start" gap="md">
        <Checkbox
          checked={done ? true : false}
          onChange={() => changeTodoStatus(id)}
          tabIndex={-1}
          radius="lg"
          size="lg"
          mr="xl"
          color="lime"
          styles={{ input: { cursor: "pointer", body: { zIndex: 99999 } } }}
          aria-hidden
        />
        <div>
          <Text fw={500} mb={7} lh={1}>
            {title}
            <Badge ml={10} color={done ? "lime" : "grey"} size="sm">
              {done ? "Done" : "Todo"}
            </Badge>
          </Text>
          <Text fz="sm" c="dimmed">
            {body}
          </Text>
        </div>
      </Flex>
      <Burger
        opened={opened}
        onClick={() => onDetailClick({ id, title, body, done })}
        aria-label="Toggle navigation"
      />
    </UnstyledButton>
  );
}
export default TodoItem;
