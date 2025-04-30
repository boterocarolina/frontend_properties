import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [openPropertyModal, setOpenPropertyModal] = useState(false);
  const {
    properties,
    tasks,
    loading,
    error,
    fetchProperties,
    createProperty,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  } = useApi();

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        properties,
        tasks,
        loading,
        error,
        fetchTasks,
        createProperty,
        createTask,
        updateTask,
        deleteTask,
        openPropertyModal,
        setOpenPropertyModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
