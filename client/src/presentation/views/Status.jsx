import { useState } from "react";
import { useStatusService } from "../../hooks/useStatusService";

function Status() {
  const { status, error, create, getById, update, remove, setStatus } =
    useStatusService();

  const [statusId, setStatusId] = useState("");
  const [statusName, setStatusName] = useState("");
  const [mode, setMode] = useState("create");

  const handleCreate = async () => {
    await create({ StatusName: statusName });
    setMode("view");
  };

  const handleSearch = async () => {
    const found = await getById(statusId);
    if (found) {
      setStatusName(found.StatusName);
      setMode("edit");
    }
  };

  const handleUpdate = async () => {
    await update(statusId, { StatusName: statusName });
    setMode("view");
  };

  const handleDelete = async () => {
    await remove(statusId);
    setStatusName("");
    setStatusId("");
    setMode("create");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">📘 Estados</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Nombre del Estado"
          value={statusName}
          onChange={(e) => setStatusName(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        {mode === "create" && (
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Crear
          </button>
        )}
        {mode === "edit" && (
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md"
          >
            Actualizar
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="number"
          placeholder="ID del Estado"
          value={statusId}
          onChange={(e) => setStatusId(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Buscar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Eliminar
        </button>
      </div>

      {status && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md shadow">
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
