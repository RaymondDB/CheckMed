import { useState } from "react";
import {
  createStatus,
  getStatusById,
  updateStatus,
  deleteStatus,
} from "../api/statusApi";

function Status() {
  const [statusId, setStatusId] = useState("");
  const [statusName, setStatusName] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("create");

  const handleCreate = async () => {
    setError("");
    if (!statusName) return setError("El nombre del estado es obligatorio");

    const res = await createStatus({ StatusName: statusName });

    if (!res.success) return setError(res.message);
    setStatus(res.data);
    setStatusId(res.data.StatusID);
    setMode("view");
  };

  const handleGet = async () => {
    setError("");
    if (!statusId) return setError("Ingresa un ID");

    const res = await getStatusById(statusId);

    if (!res.success || !res.data) {
      setStatus(null);
      return setError("Estado no encontrado");
    }

    setStatus(res.data);
    setStatusName(res.data.StatusName);
    setMode("edit");
  };

  const handleUpdate = async () => {
    setError("");
    if (!statusId || !statusName) return setError("Campos incompletos");

    const res = await updateStatus(statusId, { StatusName: statusName });

    if (!res.success) return setError(res.message);
    setStatus(res.data);
    setMode("view");
  };

  const handleDelete = async () => {
    setError("");
    if (!statusId) return setError("ID requerido");

    const res = await deleteStatus(statusId);
    if (!res.success) return setError(res.message);

    setStatus(null);
    setStatusId("");
    setStatusName("");
    setMode("create");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">
          Crear / Editar Estado
        </h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Nombre del estado"
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {mode === "create" && (
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Crear
            </button>
          )}
          {mode === "edit" && (
            <button
              onClick={handleUpdate}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Actualizar
            </button>
          )}
        </div>
      </div>

      <div className="border-t pt-4 space-y-2">
        <h3 className="text-lg font-medium text-gray-700">
          Buscar / Eliminar Estado
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            placeholder="ID del estado"
            value={statusId}
            onChange={(e) => setStatusId(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleGet}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Buscar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      </div>

      {status && (
        <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Resultado:
          </h4>
          <p>
            <strong>ID:</strong> {status.StatusID}
          </p>
          <p>
            <strong>Nombre:</strong> {status.StatusName}
          </p>
        </div>
      )}
    </div>
  );
}

export default Status;
