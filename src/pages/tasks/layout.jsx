import { Sidenav } from "@/components/sidenav/sidenav";
import TaskView from "@/components/tasks/task-view";
import { TasksListView } from "@/components/tasks/tasks-list-view";
import { TasksSidenav } from "@/components/tasks/tasks-sidenav";

const TasksLayout = () => {
  return (
    <div className="list-view-wrapper w-full flex">
      <TasksSidenav />
      <div className="tasks-view-wrapper w-full overflow-hidden flex">
        <TasksListView />
        <TaskView />
      </div>
    </div>
  );
};

export default TasksLayout;
