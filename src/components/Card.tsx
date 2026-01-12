import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import type { KanbanCard, KanbanColumn } from "../types/kanban";

type Props = {
  card: KanbanCard;
  columnId: string;
  setColumns: React.Dispatch<React.SetStateAction<KanbanColumn[]>>;
};

export default function Card({ card, columnId, setColumns }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);

  const saveTitle = () => {
    setColumns(cols =>
      cols.map(col =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map(c =>
                c.id === card.id ? { ...c, title } : c
              ),
            }
          : col
      )
    );
    setEditing(false);
  };

  const deleteCard = () => {
    setColumns(cols =>
      cols.map(col =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter(c => c.id !== card.id) }
          : col
      )
    );
  };

  return (
    <div ref={setNodeRef} style={style} className="kanban-card">
      <div className="card-indicator" />

      <span
        {...attributes}
        {...listeners}
        className="drag-handle"
        title="Drag"
      >
        ⋮⋮
      </span>

      {editing ? (
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={saveTitle}
          autoFocus
        />
      ) : (
        <p onClick={() => setEditing(true)}>{card.title}</p>
      )}

      <button className="delete-btn" onClick={deleteCard} title="Delete">
        🗑
      </button>
    </div>
  );
}
