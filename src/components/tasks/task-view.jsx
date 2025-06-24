import { UpdateTaskForm } from "../forms/update-task-form";

const TaskView = () => {
  return (
    <div className="task-view border-l border-gray/10 lg:block lg:w-[35%] h-screen">
      <UpdateTaskForm />
    </div>
  );
};

export default TaskView;
