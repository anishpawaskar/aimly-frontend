import { useTaskPage } from "@/context/task-page-provider";
import { TaskForm } from "../forms/task-form";
import { TasksList } from "./tasks-list";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProjectWithData } from "@/services/projects";
import { getTagWithData } from "@/services/tags";

export const TasksListView = () => {
  const params = useParams();
  const { projects, tags } = useTaskPage();

  const isProjects = params?.projectId ? true : false;
  const id = isProjects ? params.projectId : params?.tagId;
  const key = isProjects ? "project" : "tag";
  const detailsKey = isProjects ? "projectDetails" : "tagDetails";

  const queryFn = isProjects ? getProjectWithData : getTagWithData;

  const { data } = useQuery({
    queryKey: [key, id],
    queryFn: () => queryFn(id),
  });

  const tasks = data?.data?.tasks ?? [];
  const heading = data?.data?.[detailsKey]?.name ?? "";

  console.log("data", data);

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
          <h3 className="text-lg font-semibold truncate">{heading}</h3>
        </div>
        <TaskForm />
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};
