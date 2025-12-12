import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const sortTasks = (taskList) => {
    return [...taskList].sort((a, b) => a.completed - b.completed);
  };

  // Add Task
  const addTask = () => {
    if (input.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTasks(sortTasks([...tasks, newTask]));
    toast.success("Task Added!");
    setInput("");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(sortTasks(tasks.filter((t) => t.id !== id)));
    toast.error("Task Deleted!");
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    // Step 1: Toggle completion
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    // Step 2: Show toast message (based on OLD state)
    const oldTask = tasks.find((t) => t.id === id);

    if (oldTask && !oldTask.completed) {
      toast.success("Task completed!");
    } else {
      toast.info("Task marked incomplete");
    }

    // Step 3: Sort tasks → incomplete first, completed last
    setTasks(sortTasks(updatedTasks));
  };

  // Edit Task
  const editTask = (id, newText) => {
    setTasks(
      sortTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)))
    );
    toast.info("Task Updated!");
  };

  return (
    <div className="app-container">
      <Header />

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ToDoList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        editTask={editTask}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        transition={Slide}
      />
    </div>
  );
}

export default App;
