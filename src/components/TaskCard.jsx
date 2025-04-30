import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { Alert, IconButton, Paper, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function TaskCard({ propertyId, task }) {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const isCompleted = task.status === "completed";

  const handleStatusChange = async () => {
    const newStatus = isCompleted ? "pending" : "completed";
    const updated = await updateTask(task.id, { status: newStatus });

    if (updated) {
      const message =
        newStatus === "completed"
          ? "El estado de la tarea cambió de PENDIENTE a COMPLETADO. ¡Bien hecho!"
          : "El estado de la tarea cambió de COMPLETADO a PENDIENTE. ¡Puedes retomarla!";

      setSnackbarMsg(message);
      setSnackbarOpen(true);
    }
  };

  return (
    <div
      className={`relative p-4 rounded-lg shadow-sm transition-all duration-300 ${
        isCompleted ? "border-green-300 border-4 bg-green-50" : "bg-white"
      }`}
    >
      {/* Estado fijo */}
      <Paper
        elevation={2}
        className={`absolute top-2 left-2 px-3 py-1 text-xs rounded-full ${
          isCompleted
            ? "bg-green-200 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {isCompleted ? "Completado" : "Pendiente"}
      </Paper>

      <div className="flex justify-between items-start mt-8">
        <div className="flex items-start">
          <IconButton onClick={handleStatusChange}>
            {isCompleted ? (
              <CheckCircleIcon size="small" sx={{ color: "#6366F1" }} />
            ) : (
              <RadioButtonUncheckedIcon
                size="small"
                sx={{ color: "#6366F1" }}
              />
            )}
          </IconButton>
          <div className="ml-3">
            <h3 className="text-base font-semibold text-gray-800">
              {task.title}
            </h3>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={isCompleted ? "success" : "info"}
          variant="outlined"
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TaskCard;
