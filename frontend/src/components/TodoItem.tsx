import {Trash} from "lucide-react";
import {Todo} from "../types/Todo";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface TodoItemProps {
  todo: Todo;
  draggingId: number;
  onCompletedChange: (id: number, completed: boolean) => void;
  onTodoDelete: (id: number) => void;
  id: number;
}

export default function TodoItem({
  todo,
  onCompletedChange,
  onTodoDelete,
  id,
  draggingId,
}: TodoItemProps) {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: draggingId === id ? "0.5" : "1",
  };

  return (
    <div
      className="flex"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <label
        className={
          "flex grow items-center border gap-2 p-2 border-slate-300 rounded-md cursor-pointer " +
          (todo.completed
            ? "bg-purple-600 hover:bg-purple-500"
            : "bg-indigo-600 hover:bg-indigo-500")
        }
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
          hidden
        />
        <span
          className={
            "text-base " +
            (todo.completed ? "line-through text-slate-300" : "text-white")
          }
        >
          {todo.title}
        </span>
      </label>
      <button
        className="ml-2 py-2 text-blue-200"
        onClick={() => onTodoDelete(todo.id)}
      >
        <Trash color="currentColor" />
      </button>
    </div>
  );
}
