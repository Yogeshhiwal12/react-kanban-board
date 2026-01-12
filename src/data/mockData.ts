import type { KanbanColumn } from "../types/kanban";
import { v4 as uuid } from "uuid";

export const initialKanbanData: KanbanColumn[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      { id: uuid(), title: "Create project plan" },
      { id: uuid(), title: "Design landing page" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: uuid(), title: "Implement authentication" },
      { id: uuid(), title: "Fix navbar bug" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [{ id: uuid(), title: "Setup repository" }],
  },
];
