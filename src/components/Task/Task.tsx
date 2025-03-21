import "./Task.css";

type TaskProps = {
  task: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };
};

export default function Task(props: TaskProps) {
  return (
    <div class="container">
      <input type="checkbox" name="task-completed" id="task-completed" checked={props.task.completed} />
      <div class="task-title">{props.task.title}</div>
      <div class="task-description">{props.task.description}</div>
    </div>
  );
}
