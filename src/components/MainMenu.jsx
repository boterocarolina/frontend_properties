import { useContext, useState, useRef, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import NewPropertyModal from "./NewPropertyModal";
import { Avatar, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function MainMenu({ onSelectList }) {
  const { properties, setOpenPropertyModal } = useContext(TaskContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Bloquear scroll del body cuando el menú esté abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Cerrar al hacer clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative z-50">
      {/* Botón hamburguesa para móvil */}
      <div className="md:hidden">
        <IconButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-slate-800"
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Overlay con desenfoque que cubre la pantalla */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-indigo-950/30 backdrop-blur-sm z-40"></div>
      )}

      {/* Menú lateral */}
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static top-0 left-0 z-50 md:z-0 bg-white shadow-xl p-6 md:h-screen h-full transition-transform duration-300 ease-in-out
          w-3/4 max-w-xs md:w-72 rounded-r-lg flex flex-col`}
      >
        {/* Perfil */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Avatar sx={{ width: 48, height: 48, bgcolor: "#A5B4FC" }} />
            <div>
              <p className="text-base font-medium text-gray-800">
                Nombre Perfil
              </p>
              <p className="text-sm text-gray-500">correo@email.com</p>
            </div>
          </div>
        </div>

        {/* Lista de propiedades con scroll interno */}
        <nav className="flex-1 overflow-y-auto pr-2">
          <ul className="space-y-2">
            {properties.map((prop) => (
              <li key={prop.id}>
                <button
                  onClick={() => {
                    onSelectList(prop.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-4 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition"
                >
                  {prop.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón nueva lista */}
        <Button
          onClick={() => {
            setOpenPropertyModal(true);
            setIsMenuOpen(false);
          }}
          variant="contained"
          fullWidth
          sx={{
            mt: 4,
            bgcolor: "#6366F1",
            color: "#fff",
            "&:hover": { bgcolor: "#4F46E5" },
            textTransform: "none",
            borderRadius: "0.5rem",
            fontWeight: "500",
          }}
        >
          + Nueva Propiedad
        </Button>
      </div>

      <NewPropertyModal />
    </div>
  );
}

export default MainMenu;
