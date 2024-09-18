import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import useTodos from "./hooks/useTodos";
import {KoFiWidget} from "./components/KoFiWidget";

export default function App() {
  const {
    todos,
    createTodo,
    deleteTodo,
    setTodoCompleted,
    onOrderChange,
    handleDragStart,
    draggingId,
    donations,
  } = useTodos();

  return (
    <>
      <main className="py-16 h-screen overflow-y-auto bg-indigo-300">
        <div className="max-w-lg rounded-md bg-indigo-400 mx-auto p-5 space-y-6">
          <AddTodoForm onTodoAdd={createTodo} />
          <TodoList
            todos={todos}
            onCompletedChange={setTodoCompleted}
            onTodoDelete={deleteTodo}
            onOrderChange={onOrderChange}
            onDragStart={handleDragStart}
            draggingId={draggingId}
          />
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <KoFiWidget />
              <h3 className="text-white text-bold">Total: {donations}</h3>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
