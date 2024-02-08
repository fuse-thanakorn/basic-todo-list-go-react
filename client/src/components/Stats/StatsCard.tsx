import {
  ThemeIcon,
  Progress,
  Text,
  Group,
  Paper,
  rem,
} from "@mantine/core";
import { IconSquareRoundedCheck } from "@tabler/icons-react";
import classes from "./StatsCard.module.css";
import { Todo } from "../../App";

export function StatsCard({ todoList }: { todoList: Todo[] | undefined }) {
  const total: number | undefined = todoList?.length;
  const done: number | undefined = todoList?.filter((todo) => todo.done).length;
  const percentage: number = done && total ? (done / total) * 100 : 0;

  return (
    <Paper radius="md" withBorder className={classes.card} mt={20}>
      <ThemeIcon className={classes.icon} size={60} radius={60}>
        <IconSquareRoundedCheck
          style={{ width: rem(32), height: rem(32) }}
          stroke={1.5}

        />
      </ThemeIcon>

      <Text ta="center" fw={700} className={classes.title}>
        Total done tasks 📊
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        Total todo tasks and their progress
      </Text>

      <Group justify="space-between" mt="xs">
        <Text fz="sm" c="dimmed">
          Progress
        </Text>
        <Text fz="sm" c="dimmed">
          {percentage.toFixed(2)}%
        </Text>
      </Group>

      <Progress value={percentage} mt={5} />

      <Group justify="space-between" mt="md">
        <Text fz="sm">
          {done} / {total} tasks done
        </Text>
      </Group>
    </Paper>
  );
}
export default StatsCard;
