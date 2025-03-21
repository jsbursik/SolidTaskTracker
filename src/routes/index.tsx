import { For } from "solid-js";
import { createAsync, query } from "@solidjs/router";
import { getTasks } from "~/db/db";
import Task from "~/components/Task/Task";

const gTasks = query(getTasks, "tasks");

export const route = {
  preload: () => gTasks(),
};

export default function Home() {
  const tasks = createAsync(() => gTasks());

  return (
    <main>
      <h1>Tasks</h1>
      <For each={tasks()}>{(t) => <Task task={t} />}</For>
    </main>
  );
}
