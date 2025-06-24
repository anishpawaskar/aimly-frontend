import { useTaskPage } from "@/context/task-page-provider";
import { TaskForm } from "../forms/task-form";
import { TasksList } from "./tasks-list";
import { useParams } from "react-router";

export const TasksListView = () => {
  const params = useParams();
  const { projects, tags } = useTaskPage();

  let selectedItem;

  if (params?.projectId) {
    selectedItem = projects.find(
      (project) => project._id === params?.projectId
    );
  } else {
    selectedItem = tags.find((tag) => tag._id === params?.tagId);
  }

  return (
    <div className="tasks-list-view-wrapper w-[65%] flex-auto py-3.5 px-5">
      <div className="h-full flex flex-col gap-4">
        <div className="tasks-list-view-header h-9 flex items-center">
          <h3 className="text-lg font-semibold truncate">
            {selectedItem?.name || "Hello world"}
          </h3>
        </div>
        <TaskForm />
        <TasksList />
      </div>
    </div>
  );
};
