import { Sidenav } from "@/components/sidenav/sidenav";
import { TasksSidenav } from "@/components/tasks/tasks-sidenav";

const TasksLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <Sidenav />
      <div className="list-view-wrapper w-full flex">
        <TasksSidenav />
        <div className="tasks-view-wrapper"></div>
      </div>
    </div>
  );
};

export default TasksLayout;
