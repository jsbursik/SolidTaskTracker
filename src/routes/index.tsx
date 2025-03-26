import { For, Suspense } from "solid-js";
import { createAsync, query } from "@solidjs/router";

import Task from "~/components/Task/Task";
import { getTasks } from "~/db/db";

const fetchTasks = query(async () => {
  "use server";
  return await getTasks();
}, "tasks");

export const route = {
  preload: () => fetchTasks(),
};

export default function Home() {
  const tasks = createAsync(() => fetchTasks());

  return (
    <main>
      <h1>Tasks</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <For each={tasks()}>{(t) => <Task {...t} />}</For>
      </Suspense>
    </main>
  );
}
