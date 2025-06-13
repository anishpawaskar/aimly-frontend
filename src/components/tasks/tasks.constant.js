import { Inbox, SquareCheckBig, Trash2 } from "lucide-react";
import ListForm from "../forms/list-form";
import TagForm from "../forms/tag-form";

export const SMART_LIST = [
  {
    name: "Inbox",
    href: "/tasks/inbox",
    icon: Inbox,
  },
  {
    name: "Completed",
    href: "/completed",
    icon: SquareCheckBig,
  },
  {
    name: "Trash",
    href: "/trash",
    icon: Trash2,
  },
];

export const SIDENAV_ACCORDION_ITEMS = [
  {
    title: "Lists",
    value: "lists",
    form: ListForm,
    href: ({ id }) => `/#p/${id}/tasks`,
  },
  {
    title: "Tags",
    value: "tags",
    form: TagForm,
    href: ({ id }) => `/#t/${id}/tasks`,
  },
];
