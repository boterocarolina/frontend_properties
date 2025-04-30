import { useState } from "react";
import { Button, TextField } from "@mui/material";

function NewTaskForm({ onSubmit, onCancel }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = () => {
    if (taskName.trim()) {
      onSubmit({
        title: taskName,
        description: taskDescription,
      });
    }
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow space-y-4">
      <div>
        <TextField
          label="Nombre de la tarea"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          className="mb-4"
        />
      </div>
      <div>
        <TextField
          label="Descripción"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          className="mb-4"
        />
      </div>
      <div className="flex justify-end space-x-4 mt-5">
        <div>
          <Button
            onClick={onCancel}
            variant="outlined"
            sx={{
              color: "#4F46E5", // slate-500
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "0.5rem",
              borderBlockColor: "#4F46E5",
            }}
          >
            Cancelar
          </Button>
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: "#6366F1",
              "&:hover": { bgcolor: "#4F46E5" },
              textTransform: "none",
              borderRadius: "0.5rem",
            }}
          >
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewTaskForm;
