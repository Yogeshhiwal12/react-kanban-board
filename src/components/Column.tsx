import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { KanbanColumn } from "../types/kanban";
import Card from "./Card";
import { v4 as uuid } from "uuid";

type Props = {
  column: KanbanColumn;
  setColumns: React.Dispatch<React.SetStateAction<KanbanColumn[]>>;
};

export default function Column({ column, setColumns }: Props) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const addCard = () => {
    const title = prompt("Enter card title");
    if (!title) return;

    setColumns(cols =>
      cols.map(col =>
        col.id === column.id
          ? {
              ...col,
              cards: [...col.cards, { id: uuid(), title }],
            }
          : col
      )
    );
  };

  return (
    <div
      ref={setNodeRef}
      className={`kanban-column ${column.id}`}
    >
      <div className="column-header">
        <h3>{column.title}</h3>
        <button onClick={addCard}>＋</button>
      </div>

      <div className="add-card" onClick={addCard}>
        + Add Card
      </div>

      <SortableContext
        items={column.cards.map(c => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            columnId={column.id}
            setColumns={setColumns}
          />
        ))}
      </SortableContext>
    </div>
  );
}
