import { DndContext, closestCorners } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column";
import { initialKanbanData } from "../data/mockData";
import type { KanbanColumn } from "../types/kanban";
import "../styles/kanban.css";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialKanbanData);

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over) return;

  setColumns((columns) => {
    let sourceColIndex = -1;
    let destColIndex = -1;
    let sourceCardIndex = -1;
    let destCardIndex = -1;

    columns.forEach((col, colIndex) => {
      col.cards.forEach((card, cardIndex) => {
        if (card.id === active.id) {
          sourceColIndex = colIndex;
          sourceCardIndex = cardIndex;
        }
        if (card.id === over.id) {
          destColIndex = colIndex;
          destCardIndex = cardIndex;
        }
      });

      if (col.id === over.id) {
        destColIndex = colIndex;
        destCardIndex = col.cards.length;
      }
    });

    if (sourceColIndex === -1 || destColIndex === -1) return columns;

    const updatedColumns = [...columns];
    const [movedCard] = updatedColumns[sourceColIndex].cards.splice(
      sourceCardIndex,
      1
    );

    updatedColumns[destColIndex].cards.splice(
      destCardIndex,
      0,
      movedCard
    );

    return updatedColumns;
  });
};


  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {columns.map(col => (
          <Column key={col.id} column={col} setColumns={setColumns} />
        ))}
      </div>
    </DndContext>
  );
}
