import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {Todo} from "../types/Todo";
import TodoItem from "./TodoItem";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {useCallback, useMemo} from "react";

interface TodoListProps {
  todos: Todo[];
  onCompletedChange: (id: number, completed: boolean) => void;
  onTodoDelete: (id: number) => void;
  onOrderChange: (currentId: number, secondId: number) => void;
  handleDragStart: () => void;
  handleDragMove: () => void;
}

export default function TodoList({
  todos,
  onCompletedChange,
  onTodoDelete,
  onOrderChange,
  handleDragMove,
  handleDragStart,
}: TodoListProps) {
  const ids = useMemo(() => todos.map((t) => t.id), [todos]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const {active, over} = event;

      if (over && active.id !== over.id) {
        onOrderChange(active.id as number, over.id as number);
      }
    },
    [onOrderChange],
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
      sensors={sensors}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              onCompletedChange={onCompletedChange}
              onTodoDelete={onTodoDelete}
              id={todo.id}
              key={todo.id}
            />
          ))}
          {todos.length === 0 && (
            <p className="text-center text-white" unselectable="on">
              You have no tasks left. Let's add something
            </p>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
