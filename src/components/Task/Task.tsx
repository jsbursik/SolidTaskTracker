import "./Task.css";

import type { TaskObj } from "~/types";
import { toggleTask } from "~/db/db";

const handleCheck = (t: TaskObj) => {
  "use server";
  toggleTask(t);
};

export default function Task(t: TaskObj) {
  return (
    <div class="container">
      <input type="checkbox" name="task-completed" id="task-completed" checked={t.completed} onChange={() => handleCheck(t)} />
      <div class="task-title">
        {t.title}: {t.ID}
      </div>
      <div class="task-description">{t.description}</div>
    </div>
  );
}
