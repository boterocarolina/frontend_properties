import { useState } from "react";

const BASE_URL = "https://backendproperties-api-production.up.railway.app/api";

export const useApi = () => {
  const [properties, setProperties] = useState([]);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [createError, setCreateError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/properties`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al obtener propiedades: ${response.status} - ${errorText}`
        );
      }
      const data = await response.json();
      setProperties(data);
    } catch (_err) {
      setFetchError(_err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProperty = async (propertyData) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al crear propiedad: ${response.status} - ${errorText}`
        );
      }
      const newProperty = await response.json();
      setProperties([...properties, newProperty]);
    } catch (_err) {
      setCreateError(_err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (propertyId) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tasks/${propertyId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al obtener tareas: ${response.status} - ${errorText}`
        );
      }
      const data = await response.json();
      setTasks((prev) => ({ ...prev, [propertyId]: data }));
    } catch (_err) {
      setFetchError(_err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const propertyId = taskData.property_id;
      const response = await fetch(`${BASE_URL}/tasks/${propertyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status || "pending",
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al crear tarea: ${response.status} - ${errorText}`
        );
      }
      const newTask = await response.json();
      setTasks((prev) => ({
        ...prev,
        [propertyId]: [...(prev[propertyId] || []), newTask],
      }));
      setCreateError(null);
      return newTask;
    } catch (err) {
      console.error("Error al crear tarea:", err);
      setCreateError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, updatedFields) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al actualizar tarea: ${response.status} - ${errorText}`
        );
      }
      const updatedTask = await response.json();
      const propertyId = updatedTask.property_id;

      // Actualizamos el estado con los campos enviados y la respuesta del backend
      setTasks((prev) => {
        const updatedTasks = {
          ...prev,
          [propertyId]: prev[propertyId].map((task) =>
            task.id === taskId
              ? { ...task, ...updatedFields, ...updatedTask }
              : task
          ),
        };
        console.log("Estado tasks actualizado:", updatedTasks);
        return updatedTasks;
      });
      setUpdateError(null);
      return updatedTask;
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
      setUpdateError(err.message);
      // Si el backend falla, devolvemos los campos actualizados para manejarlos localmente
      return { id: taskId, ...updatedFields };
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId, propertyId) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al eliminar tarea: ${response.status} - ${errorText}`
        );
      }
      setTasks((prev) => ({
        ...prev,
        [propertyId]: prev[propertyId].filter((task) => task.id !== taskId),
      }));
    } catch (_err) {
      setFetchError(_err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    properties,
    tasks,
    loading,
    fetchError,
    createError,
    updateError,
    fetchProperties,
    createProperty,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
