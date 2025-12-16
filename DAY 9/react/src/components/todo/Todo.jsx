import { useState } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setList([...list, task]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 w-80 mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Todo App</h1>

      <input
        className="border p-2 w-full"
        placeholder="Add task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button
        className="bg-green-600 text-white p-2 mt-2 w-full rounded"
        onClick={addTask}
      >
        Add
      </button>

      <ul className="mt-4">
        {list.map((t, i) => (
          <li
            key={i}
            className="flex justify-between border-b p-2"
          >
            {t}
            <button
              className="text-red-600"
              onClick={() => deleteTask(i)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
