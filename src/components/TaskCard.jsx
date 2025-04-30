import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskCard({ propertyId, task }) {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const isCompleted = task.status === "completed";

  const handleStatusChange = async (e) => {
    const newStatus = e.target.checked ? "completed" : "pending";
    await updateTask(task.id, { status: newStatus });
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-sm ${
        isCompleted ? "border-green-300 border-4" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleStatusChange}
            className="mt-1 mr-3 accent-indigo-600"
          />
          <div>
            <h3 className="text-base font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
        </div>
        <IconButton
          onClick={() => deleteTask(task.id, propertyId)}
          size="small"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TaskCard;
