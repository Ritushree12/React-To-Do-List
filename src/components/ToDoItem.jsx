import { useState } from "react";

function ToDoItem({ task, deleteTask, toggleComplete, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(task.text);

  const saveEdit = () => {
    if (editInput.trim() === "") return;
    editTask(task.id, editInput);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {/* Checkbox to toggle completion */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />

      {isEditing ? (
        <>
          <input
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <button className="save-button" onClick={saveEdit}>
            Save
          </button>
        </>
      ) : (
        <>
          <span className={task.completed ? "completed" : ""}>{task.text}</span>

          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete-button" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default ToDoItem;
