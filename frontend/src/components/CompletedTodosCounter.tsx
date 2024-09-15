import { Todo } from "../types/Todo";

interface CompletedTodosCounterProps {
    todos: Todo[];
    deleteCompletedTodos: () => void;
}

export default function CompletedTodosCounter({ todos, deleteCompletedTodos }: CompletedTodosCounterProps) {
    const completedTodos = todos.filter(todo => todo.completed);

    return (<div className="flex flex-col items-center justify-center">

        <p
            className="text-sm text-center"
        >
            Completed {completedTodos.length}/{todos.length} todos
        </p>
        {completedTodos.length > 0 &&
            <button
                className="mx-2 text-sm text-center text-slate-500 hover:underline"
                onClick={deleteCompletedTodos}
            >
                Delete all completed todos
            </button>}
    </div>
    );
}