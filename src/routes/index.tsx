import { For } from "solid-js";
import { createAsync, query, RouteDefinition } from "@solidjs/router";
import { getTasks } from "~/db/db";
import Task from "~/components/Task/Task";

const fetchTasks = query(getTasks, "tasks");

export const route = {
  preload: () => fetchTasks(),
} satisfies RouteDefinition;

export default function Home() {
  const tasks = createAsync(() => fetchTasks());
  return (
    <main>
      <h1>Tasks</h1>
      <For each={tasks()}>{(t) => <Task {...t} />}</For>
    </main>
  );
}
