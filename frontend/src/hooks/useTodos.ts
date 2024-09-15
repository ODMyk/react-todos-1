import {useEffect, useState} from "react";
import {Todo} from "../types/Todo";
import {dummydata} from "../data/todos";

export default function useTodos() {
  const [todos, setTodos] = useState(() => {
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") ?? "[]",
    );
    return savedTodos.length > 0 ? savedTodos : dummydata;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? {...todo, completed} : todo)),
    );
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function createTodo(title: string) {
    setTodos((prevTodos) => [
      ...prevTodos,
      {id: Date.now(), title, completed: false},
    ]);
  }

  function onOrderChange(active: number, over: number) {
    setTodos((prev) => {
      const oldInd = prev.findIndex((t) => t.id == active);
      const newInd = prev.findIndex((t) => t.id == over);

      const newItems = [...prev];

      newItems.splice(oldInd, 1);

      newItems.splice(newInd, 0, prev[oldInd]);

      return newItems;
    });
  }

  function handleDragStart() {}
  function handleDragMove() {}

  return {
    todos,
    setTodoCompleted,
    deleteTodo,
    createTodo,
    onOrderChange,
    handleDragMove,
    handleDragStart,
  };
}
