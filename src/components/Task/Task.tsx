import type { Task } from "~/types";
import "./Task.css";

import { toggleTask } from "~/db/db";
import { createSignal } from "solid-js";

export default function Task(props: Task) {
  const [checked, setChecked] = createSignal(props.completed);

  const handleCheck = () => {
    console.log("CHECKED!!");
    setChecked(!checked());
  };

  // const handleCheck = async () => {
  //   console.log("CHECKED");
  //   const newCheckedState = !checked();
  //   setChecked(newCheckedState);

  //   try {
  //     await toggleTask(props);
  //   } catch (e) {
  //     console.error("Error updating task: ", e);
  //     setChecked(!checked());
  //   }
  // };

  return (
    <div class="container">
      <input type="checkbox" name="task-completed" id="task-completed" checked={checked()} onChange={() => console.log("CHECKED")} />
      <div class="task-title">
        {props.title}: {props.ID}
      </div>
      <div class="task-description">{props.description}</div>
    </div>
  );
}
