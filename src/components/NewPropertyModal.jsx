import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { Box, Button, Modal, TextField } from "@mui/material";

function NewPropertyModal() {
  const { openPropertyModal, setOpenPropertyModal, createProperty } =
    useContext(TaskContext);
  const [propertyName, setPropertyName] = useState("");
  const [propertyDescription, setPropertyDescription] = useState("");

  const handleSubmit = () => {
    if (propertyName.trim()) {
      createProperty({
        title: propertyName,
        description: propertyDescription,
      });
      setPropertyName("");
      setPropertyDescription("");
      setOpenPropertyModal(false);
    }
  };

  return (
    <Modal open={openPropertyModal} onClose={() => setOpenPropertyModal(false)}>
      <Box className="bg-white p-6 rounded-xl shadow-xl w-11/12 sm:w-[400px] mx-auto mt-24 outline-none">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Nueva Propiedad
        </h2>

        <TextField
          label="Nombre de la Propiedad"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Descripción de la Propiedad"
          value={propertyDescription}
          onChange={(e) => setPropertyDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={() => setOpenPropertyModal(false)}
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

          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: "#4F46E5", // indigo-600
              color: "#fff",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "0.5rem",
              "&:hover": {
                bgcolor: "#4338CA", // indigo-700
              },
            }}
          >
            Crear
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default NewPropertyModal;
