import {useEffect, useState} from "react";
import {Todo} from "../types/Todo";

const ws = new WebSocket("ws://localhost:8080");

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draggingId, setDraggingId] = useState(-1);
  const [donations, setDonations] = useState(0);

  useEffect(() => {
    ws.onmessage = (m) => {
      const {type, data} = JSON.parse(m.data);

      if (type === "updateTasks") {
        setTodos(data);
      } else if (type === "addTodo") {
        setTodos((prev) => [...prev, data]);
      } else if (type === "removeTodo") {
        setTodos((prev) => prev.filter((t) => t.id !== data));
      } else if (type === "dragStart") {
        setDraggingId(data);
      } else if (type === "dragEnd") {
        setDraggingId(-1);
      } else if (type === "updateDonations") {
        setDonations(data);
      }
    };
  }, []);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) =>
        todo.id === id ? {...todo, completed} : todo,
      );
      ws.send(JSON.stringify({type: "updateTasks", data: newTodos}));
      return newTodos;
    });
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    ws.send(JSON.stringify({type: "removeTodo", data: id}));
  }

  function createTodo(title: string) {
    const todo = {id: Date.now(), title, completed: false};
    setTodos((prevTodos) => [...prevTodos, todo]);
    ws.send(JSON.stringify({type: "addTodo", data: todo}));
  }

  function onOrderChange(active: number, over: number) {
    ws.send(JSON.stringify({type: "dragEnd"}));
    setTodos((prev) => {
      const oldInd = prev.findIndex((t) => t.id == active);
      const newInd = prev.findIndex((t) => t.id == over);

      const newItems = [...prev];

      newItems.splice(oldInd, 1);

      newItems.splice(newInd, 0, prev[oldInd]);

      ws.send(JSON.stringify({type: "updateTasks", data: newItems}));

      return newItems;
    });
  }

  function handleDragStart(active: number) {
    ws.send(JSON.stringify({type: "dragStart", data: active}));
  }

  return {
    todos,
    setTodoCompleted,
    deleteTodo,
    createTodo,
    onOrderChange,
    handleDragStart,
    draggingId,
    donations,
  };
}
