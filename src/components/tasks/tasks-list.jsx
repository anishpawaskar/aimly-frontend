import { Link, useLocation, useParams } from "react-router";
import { Square, SquareCheck } from "lucide-react";
import { useRef, useState } from "react";
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "../common/date-picker";
import {
  TaskDropdownMenu,
  TaskDropdownMenuContent,
  TaskDropdownMenuTrigger,
} from "./task-dropdown-menu";
import { useTaskPage } from "@/context/task-page-provider";
import {
  cn,
  moveToBottomSortOrder,
  moveToMiddleSortOrder,
  moveToTopSortOrder,
} from "@/lib/utils";

const PRIORITIES = [
  {
    name: "High",
    value: 5,
    color: "text-priority-high",
    fillColor: "fill-priority-high",
  },
  {
    name: "Medium",
    value: 3,
    color: "text-priority-medium",
    fillColor: "fill-priority-medium",
  },
  {
    name: "Low",
    value: 1,
    color: "text-priority-low",
    fillColor: "fill-priority-low",
  },
  {
    name: "None",
    value: 0,
    color: "text-gray/60",
    fillColor: "fill-transparent",
  },
];

export const TasksList = ({ tasks }) => {
  // const { tasks, setTasks } = useTaskPage();

  const params = useParams();

  const dragItemRef = useRef(null);
  const dragOverItemRef = useRef(null);

  const handleDragStart = (e) => {
    dragItemRef.current = e.currentTarget?.id;
  };

  const handleDragEnter = (e) => {
    e.stopPropagation();
    dragOverItemRef.current = e.currentTarget?.id;
  };

  const handleDrop = () => {
    const sortedTasks = [...tasks].sort((a, b) => a.sortOrder - b.sortOrder);

    const beforeItemIndex = sortedTasks.findIndex(
      (task) => task._id === dragOverItemRef.current
    );

    if (dragItemRef.current === dragOverItemRef.current) {
      return;
    }

    const beforeItem = sortedTasks.at(beforeItemIndex);
    const afterItem = sortedTasks.at(beforeItemIndex + 1);

    let newSortOrder;

    if (!afterItem) {
      newSortOrder = moveToBottomSortOrder({
        itemId: dragItemRef.current,
        items: tasks,
      });
    }

    if (beforeItem && afterItem) {
      newSortOrder = moveToMiddleSortOrder({
        items: tasks,
        beforeItemId: beforeItem._id,
        afterItemId: afterItem._id,
      });
    }

    if (tasks.length > 0 && beforeItemIndex === 0) {
      newSortOrder = moveToTopSortOrder({ items: tasks });
    }

    const updatedTaks = tasks.map((task) =>
      task._id === dragItemRef.current
        ? { ...task, sortOrder: newSortOrder }
        : task
    );

    // setTasks(updatedTaks);
    dragItemRef.current = null;
    dragOverItemRef.current = null;
  };

  // let data;

  // if (params?.projectId) {
  //   data = tasks
  //     .filter(
  //       (task) => task.projectId === params?.projectId && task.status === 0
  //     )
  //     .map((task) => {
  //       const tags = task.tags.map((tagId) => {
  //         const existingTag = tags.find((tag) => tag._id === tagId);

  //         return {
  //           _id: existingTag._id,
  //           name: existingTag.name,
  //           color: existingTag.color,
  //         };
  //       });

  //       return {
  //         ...task,
  //         tags,
  //       };
  //     })
  //     .sort((a, b) => a.sortOrder - b.sortOrder);
  // }

  // if (params?.tagId) {
  //   data = tasks
  //     .filter((task) => task.tags.includes(params?.tagId) && task.status === 0)
  //     .map((task) => {
  //       const tags = task.tags.map((tagId) => {
  //         const existingTag = tags.find((tag) => tag._id === tagId);

  //         return {
  //           _id: existingTag._id,
  //           name: existingTag.name,
  //           color: existingTag.color,
  //         };
  //       });

  //       return {
  //         ...task,
  //         tags,
  //       };
  //     })
  //     .sort((a, b) => a.sortOrder - b.sortOrder);
  // }

  return !!!tasks.length ? (
    <div className="h-full w-full flex items-center justify-center">
      <h3 className="text-2xl font-semibold">No tasks</h3>
    </div>
  ) : (
    <ul
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
      className="tasks-list overflow-y-auto"
    >
      {tasks.map((task) => {
        return (
          <TaskListItem
            key={task._id}
            task={task}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
          />
        );
      })}
    </ul>
  );
};

const TaskListItem = ({ task, handleDragStart, handleDragEnter }) => {
  const [date, setDate] = useState(
    task.dueDate ? new Date(task.dueDate) : null
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // const { tasks, setTasks } = useTaskPage();

  const priority = PRIORITIES.find(
    (priority) => priority.value === task.priority
  );

  const handleCompleted = (e) => {
    e.stopPropogation();
    e.preventDefault();
    const updatedTask = tasks.map((taskItem) =>
      taskItem._id === task._id
        ? { ...taskItem, status: taskItem.status === 1 ? 0 : 1 }
        : taskItem
    );

    // setTasks(updatedTask);
  };

  return (
    <li
      id={task._id}
      key={task._id}
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      className="h-9 px-3 flex items-center gap-4 rounded-md hover:bg-cancel-btn-hover transition-colors group"
    >
      <Link
        to={`${location.pathname}/${task._id}`}
        className="h-full flex flex-1 items-center"
      >
        <button
          onClick={handleCompleted}
          className={"h-6 w-6 rounded-md flex items-center shrink-0"}
        >
          {task?.status !== 1 ? (
            <Square
              size={20}
              strokeWidth={1.5}
              className={`${priority.color} transition-colors`}
            />
          ) : (
            <SquareCheck size={20} className="text-gray/40" />
          )}
        </button>
        <span className="task-title text-sm grow truncate">{task.title}</span>
      </Link>
      <div className="shrink-0 flex items-center gap-1.5">
        {!!task.tags.length && (
          <div className="tags-wrapper hidden shrink-0 sm:flex items-center gap-1.5">
            {task.tags.slice(0, 2).map((tag) => {
              const styles = {};

              if (tag.color) {
                styles.background = tag.color + "80";
              }

              return (
                <Link
                  style={styles}
                  to={`/tags/${tag._id}/tasks`}
                  key={tag._id}
                  className={cn(
                    "text-xs h-5 flex justify-center items-center max-w-[88px] rounded-full truncate text-gray/60 px-2 break-all",
                    !tag.color && `bg-primary/50`
                  )}
                >
                  {tag.name}
                </Link>
              );
            })}
            {task.tags.slice(2, task.tags.length).length > 0 && (
              <span className="h-[18px] max-w-[88px] px-2 text-xs text-gray/60 rounded-full bg-[#D4DDF8] flex items-center">
                +{task.tags.slice(2, task.tags.length).length}
              </span>
            )}
          </div>
        )}
        {task.dueDate && (
          <DatePicker
            date={date}
            setDate={setDate}
            open={isCalendarOpen}
            setOpen={setIsCalendarOpen}
          >
            <DatePickerTrigger
            // TODO: change color if task due date is expired
            />
            <DatePickerContent
              align={"start"}
              alignOffset={70}
              sideOffset={0}
              clearState={() => {
                setDate(null);
              }}
              onSelect={(date) => {
                setDate(date);
                setIsCalendarOpen(false);
              }}
            />
          </DatePicker>
        )}
        {/* <button className="shrink-0 h-full sm:invisible sm:group-hover:visible">
                <Ellipsis size={16} className="text-gray/40" />
              </button> */}
        <TaskDropdownMenu task={task}>
          <TaskDropdownMenuTrigger />
          <TaskDropdownMenuContent />
        </TaskDropdownMenu>
      </div>
    </li>
  );
};

//  {TASKS_DATA.map((task) => {
//         const [date, setDate] = useState(
//           task.dueDate ? new Date(task.dueDate) : null
//         );
//         const [isCalendarOpen, setIsCalendarOpen] = useState(false);

//         return (
//           <li
//             key={task._id}
//             className="h-9 px-3 flex items-center gap-4 rounded-md hover:bg-cancel-btn-hover transition-colors group"
//           >
//             <Link
//               to={`${location.pathname}/${task._id}`}
//               className="h-full flex flex-1 items-center"
//             >
//               <button
//                 className={"h-6 w-6 rounded-md flex items-center shrink-0"}
//               >
//                 <Square size={20} strokeWidth={1.5} className="text-gray/50" />
//               </button>
//               <span className="task-title text-sm grow truncate">
//                 {task.title}
//               </span>
//             </Link>
//             <div className="shrink-0 flex items-center gap-1.5">
//               {!!task.tags.length && (
//                 <div className="tags-wrapper hidden shrink-0 sm:flex items-center gap-1.5">
//                   {task.tags.slice(0, 2).map((tag) => {
//                     return (
//                       <Link
//                         style={{
//                           background: tag.color,
//                         }}
//                         to={`/tags/${tag._id}/tasks`}
//                         key={tag._id}
//                         className="text-xs h-5 flex justify-center items-center max-w-[88px] rounded-full truncate text-gray/60 px-2 break-all"
//                       >
//                         {tag.name}
//                       </Link>
//                     );
//                   })}
//                   {task.tags.slice(2, task.tags.length).length > 0 && (
//                     <span className="h-[18px] max-w-[88px] px-2 text-xs text-gray/60 rounded-full bg-[#D4DDF8] flex items-center">
//                       +{task.tags.slice(2, task.tags.length).length}
//                     </span>
//                   )}
//                 </div>
//               )}
//               {task.dueDate && (
//                 <DatePicker
//                   date={date}
//                   setDate={setDate}
//                   open={isCalendarOpen}
//                   setOpen={setIsCalendarOpen}
//                 >
//                   <DatePickerTrigger
//                   // TODO: change color if task due date is expired
//                   />
//                   <DatePickerContent
//                     align={"start"}
//                     alignOffset={70}
//                     sideOffset={0}
//                     clearState={() => {
//                       setDate(null);
//                     }}
//                     onSelect={(date) => {
//                       setDate(date);
//                       setIsCalendarOpen(false);
//                     }}
//                   />
//                 </DatePicker>
//               )}
//               {/* <button className="shrink-0 h-full sm:invisible sm:group-hover:visible">
//                 <Ellipsis size={16} className="text-gray/40" />
//               </button> */}
//               <TaskDropdownMenu task={task}>
//                 <TaskDropdownMenuTrigger />
//                 <TaskDropdownMenuContent />
//               </TaskDropdownMenu>
//             </div>
//           </li>
//         );
//       })}
