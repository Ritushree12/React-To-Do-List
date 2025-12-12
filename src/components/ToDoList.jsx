import ToDoItem from "./ToDoItem";

function ToDoList({ tasks, deleteTask, toggleComplete, editTask }) {
  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default ToDoList;
