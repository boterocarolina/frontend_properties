import { useContext, useState } from "react";
import { TaskContext } from "./context/TaskContext";
import MainMenu from "./components/MainMenu";
import PropertyCard from "./components/PropertyCard";

function App() {
  const { properties } = useContext(TaskContext);
  const [selectedListId, setSelectedListId] = useState(null);

  const selectedProperty = properties.find(
    (prop) => prop.id === selectedListId
  );

  return (
    <div className="flex flex-col md:flex-row">
      <MainMenu onSelectList={setSelectedListId} />
      <div className="flex-1 p-4 md:p-6 bg-gray-100">
        <h1 className="text-xl md:text-2xl font-bold mb-4 mt-14 md:mt-0 uppercase ">Mis Propiedades</h1>
        {selectedProperty ? (
          <div className="flex flex-wrap gap-4 w-full">
            <PropertyCard property={selectedProperty} />
          </div>
        ) : (
          <p className="text-gray-600">
            ¡Aún no has seleccionado una lista! Crea una nueva lista desde el menú y comienza a agregar tus tareas
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
