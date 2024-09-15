import {useState} from "react";

interface AddTodoFormProps {
  onTodoAdd: (title: string) => void;
}

export default function AddTodoForm({onTodoAdd}: AddTodoFormProps) {
  const [input, setInput] = useState("");

  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        if (!input.trim()) {
          return;
        }

        onTodoAdd(input);
        setInput("");
      }}
    >
      <input
        type="text"
        placeholder="What task are you going to complete ?"
        value={input}
        className="grow rounded-s-md p-2"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-e-md p-2 w-20"
      >
        Push
      </button>
    </form>
  );
}
