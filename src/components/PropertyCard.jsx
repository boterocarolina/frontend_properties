import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import NewTaskForm from "./NewTaskForm";
import { Button } from "@mui/material";

function PropertyCard({ property }) {
  const {
    tasks,
    fetchTasks,
    createTask,
    fetchError,
    createError,
    updateError,
  } = useContext(TaskContext);
  const [openTaskForm, setOpenTaskForm] = useState(false);

  useEffect(() => {
    fetchTasks(property.id);
  }, [property.id, fetchTasks]);

  const handleAddTask = async (taskData) => {
    await createTask({
      property_id: property.id,
      title: taskData.title,
      description: taskData.description,
      status: "pending",
    });
    setOpenTaskForm(false);
  };

  const propertyTasks = tasks[property.id] || [];

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md space-y-4">
      <div className=" p-4 ">
        <h2 className="text-xl font-bold text-gray-800">{property.title}</h2>
        <p className="text-gray-600">{property.description}</p>
      </div>

      <div className="w-50 px-4 flex justify-between items-center">
        <Button
          onClick={() => setOpenTaskForm(true)}
          fullWidth
          sx={{
            bgcolor: "#6366F1",
            color: "#fff",
            "&:hover": { bgcolor: "#4F46E5" },
            textTransform: "none",
            borderRadius: "0.5rem",
            fontWeight: "500",
          }}
        >
          + Agregar tarea
        </Button>
      </div>

      {fetchError && (
        <p className="text-red-500 text-sm mb-2">Error: {fetchError}</p>
      )}
      {createError && (
        <p className="text-red-500 text-sm mb-2">Error: {createError}</p>
      )}
      {updateError && (
        <p className="text-red-500 text-sm mb-2">Error: {updateError}</p>
      )}

      <div className="space-y-2">
        {propertyTasks.map((task) => (
          <TaskCard key={task.id} propertyId={property.id} task={task} />
        ))}
      </div>

      {openTaskForm && (
        <div className="mt-4">
          <NewTaskForm
            onSubmit={handleAddTask}
            onCancel={() => setOpenTaskForm(false)}
          />
        </div>
      )}
    </div>
  );
}

export default PropertyCard;
