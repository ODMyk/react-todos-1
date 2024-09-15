import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import useTodos from "./hooks/useTodos";

export default function App() {
  const {
    todos,
    createTodo,
    deleteTodo,
    setTodoCompleted,
    onOrderChange,
    handleDragMove,
    handleDragStart,
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
            handleDragStart={handleDragStart}
            handleDragMove={handleDragMove}
          />
        </div>
      </main>
    </>
  );
}
