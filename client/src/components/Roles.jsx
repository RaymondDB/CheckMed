import { useState } from "react";
import {
  createRole,
  getRoleById,
  updateRole,
  deleteRole,
} from "../api/rolesApi";

function Roles() {
  const [roleName, setRoleName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [roleId, setRoleId] = useState("");
  const [foundRole, setFoundRole] = useState(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("create");

  const handleCreate = async () => {
    setError("");
    if (!roleName) return setError("El nombre del rol es obligatorio");

    const data = {
      RoleName: roleName,
      CreatedAt: new Date(),
      IsActive: isActive,
    };

    const res = await createRole(data);

    if (!res.success) return setError(res.message);
    setFoundRole(res.data);
    setMode("view");
  };

  const handleGet = async () => {
    setError("");
    if (!roleId) return setError("ID requerido para buscar");

    const res = await getRoleById(roleId);
    if (!res.success || !res.data) {
      setFoundRole(null);
      return setError("Rol no encontrado");
    }

    setFoundRole(res.data);
    setRoleName(res.data.RoleName);
    setIsActive(res.data.IsActive);
    setMode("edit");
  };

  const handleUpdate = async () => {
    setError("");
    if (!roleId) return setError("ID requerido");

    const res = await updateRole(roleId, {
      RoleName: roleName,
      IsActive: isActive,
      UpdatedAt: new Date(),
    });

    if (!res.success) return setError(res.message);
    setFoundRole(res.data);
    setMode("view");
  };

  const handleDelete = async () => {
    setError("");
    if (!roleId) return setError("ID requerido para eliminar");

    const res = await deleteRole(roleId);
    if (!res.success) return setError(res.message);

    setFoundRole(null);
    setRoleId("");
    setRoleName("");
    setIsActive(true);
    setMode("create");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">
          Crear / Editar Rol
        </h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Nombre del Rol"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="accent-blue-600"
            />
            <span>Activo</span>
          </label>
          {mode === "create" && (
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Crear Rol
            </button>
          )}
          {mode === "edit" && (
            <button
              onClick={handleUpdate}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Actualizar Rol
            </button>
          )}
        </div>
      </div>

      <div className="border-t pt-4 space-y-2">
        <h3 className="text-lg font-medium text-gray-700">
          Buscar / Eliminar Rol
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            placeholder="ID del Rol"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
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

      {foundRole && (
        <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Resultado:
          </h4>
          <p>
            <strong>ID:</strong> {foundRole.RoleID}
          </p>
          <p>
            <strong>Nombre:</strong> {foundRole.RoleName}
          </p>
          <p>
            <strong>Activo:</strong> {foundRole.IsActive ? "Sí" : "No"}
          </p>
          <p>
            <strong>Creado:</strong> {formatDate(foundRole.CreatedAt)}
          </p>
          <p>
            <strong>Actualizado:</strong> {formatDate(foundRole.UpdatedAt)}
          </p>
        </div>
      )}
    </div>
  );
}

export default Roles;
