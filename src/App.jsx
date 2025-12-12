import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Add Task
  const addTask = () => {
    if (input.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    toast.success("Task Added!");
    setInput("");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error("Task Deleted!");
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const updatedTask = tasks.find((t) => t.id === id);

    if (updatedTask && !updatedTask.completed) {
      toast.success("Task completed!");
    } else {
      toast.info("Task is incomplete");
    }
  };

  // Edit Task
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
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
