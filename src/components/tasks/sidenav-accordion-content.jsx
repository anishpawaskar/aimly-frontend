import { AlignJustify } from "lucide-react";
import { AccordionContent } from "../primitive/accordion";
import { NavLink, useLocation } from "react-router";
import { useTasksSidenav } from "@/context/tasks-sidenav-provider";
import {
  cn,
  moveToBottomSortOrder,
  moveToMiddleSortOrder,
  moveToTopSortOrder,
} from "@/lib/utils";
import { useRef } from "react";
import { useTaskPage } from "@/context/task-page-provider";
import { useTasksSidenavData } from "@/hooks/queries/tasksSidenav";

export const SidenavAccordionContent = ({ item }) => {
  // const { items, setItems } = useTasksSidenav();
  // const { projects, setProjects, tags, setTags } = useTaskPage();

  const { data: queryData } = useTasksSidenavData(item);

  const totalCountKey =
    item.value === "lists" ? "totalAssignTasks" : "assignTaskCount";

  // const items = item.value === "lists" ? projects : tags;
  // const setItems = item.value === "lists" ? setProjects : setTags;

  const data = queryData ? [...queryData?.data?.[item.dataKey]] : [];
  const SidenavDropdownMenu = item.dropdownMenu;

  const location = useLocation();

  const dragItemRef = useRef(null);
  const dragOverItemRef = useRef(null);

  const handleDragStart = (e) => {
    dragItemRef.current = e.currentTarget?.id;
  };

  const handleDragEnter = (e) => {
    dragOverItemRef.current = e.currentTarget?.id;
  };

  const handleDrop = () => {
    const newItems = [...queryData?.data?.[item.dataKey]];
    newItems.sort((a, b) => a.sortOrder - b.sortOrder);

    const beforeItemIndex = newItems.findIndex(
      (task) => task._id === dragOverItemRef.current
    );

    if (dragItemRef.current === dragOverItemRef.current) {
      return;
    }

    const beforeItem = newItems.at(beforeItemIndex);
    const afterItem = newItems.at(beforeItemIndex + 1);

    let newSortOrder;

    if (!afterItem) {
      newSortOrder = moveToBottomSortOrder({
        items: queryData?.data?.[item.dataKey],
        itemId: dragItemRef.current,
      });
    }

    if (beforeItem && afterItem) {
      newSortOrder = moveToMiddleSortOrder({
        items: queryData?.data?.[item.dataKey],
        afterItemId: afterItem._id,
        beforeItemId: beforeItem._id,
      });
    }

    if (queryData?.data?.[item.dataKey].length > 0 && beforeItemIndex === 0) {
      newSortOrder = moveToTopSortOrder({
        items: queryData?.data?.[item.dataKey],
      });
    }

    // const updatedItems = queryData?.data?.[item.dataKey].map((item) =>
    //   item._id === dragItemRef.current
    //     ? { ...item, sortOrder: newSortOrder }
    //     : item
    // );
    // setItems(updatedItems);
  };

  return (
    <AccordionContent asChild>
      <ul
        // TODO: figure out way to hide scroll because two two scolls are appearing
        className="max-h-none"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}
      >
        {!!!data.length ? (
          <li className="text-xs text-gray/40 bg-gray/5 rounded-md py-2 px-[14px] pl-5">
            {item.fallbackText}
          </li>
        ) : (
          data
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((dataItem) => {
              const isActive =
                location.pathname === item.href({ id: dataItem._id });

              return (
                <li
                  id={dataItem._id}
                  key={dataItem._id}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  className={cn(
                    "h-9 pr-2 flex items-center group/content sm:hover:bg-cancel-btn-hover sm:active:bg-cancel-btn-active rounded-md transition-colors",
                    isActive && "bg-gray/5"
                  )}
                >
                  <NavLink
                    to={item.href({ id: dataItem._id })}
                    className={"h-full flex flex-1 items-center pl-4 truncate"}
                  >
                    <AlignJustify
                      size={18}
                      className="text-gray/40 shrink-0 mr-2"
                    />
                    <span className="flex-1 text-sm text-gray truncate">
                      {dataItem.name}
                    </span>
                  </NavLink>
                  <div
                    style={{
                      backgroundColor: dataItem.color,
                    }}
                    className="w-2 h-2 rounded-full mx-1.5"
                  ></div>
                  <div className="shrink-0 flex items-center justify-end min-w-6">
                    <SidenavDropdownMenu data={dataItem} />
                    <span
                      className={
                        "text-xs text-gray/40 block group-hover/content:hidden"
                      }
                    >
                      {!!dataItem[totalCountKey] && dataItem[totalCountKey]}
                    </span>
                  </div>
                </li>
              );
            })
        )}
      </ul>
    </AccordionContent>
  );
};
