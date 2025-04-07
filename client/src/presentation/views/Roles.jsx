import { useState } from "react";
import { useRoleService } from "../../hooks/useRoleService";

function Roles() {
  const { role, error, create, getById, update, remove, setRole } =
    useRoleService();

  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [mode, setMode] = useState("create");

  const handleCreate = async () => {
    const newRole = {
      RoleName: roleName,
      IsActive: isActive,
      CreatedAt: new Date(),
    };
    await create(newRole);
    setMode("view");
  };

  const handleSearch = async () => {
    const found = await getById(roleId);
    if (found) {
      setRoleName(found.RoleName);
      setIsActive(found.IsActive);
      setMode("edit");
    }
  };

  const handleUpdate = async () => {
    const updated = {
      RoleName: roleName,
      IsActive: isActive,
      UpdatedAt: new Date(),
    };
    await update(roleId, updated);
    setMode("view");
  };

  const handleDelete = async () => {
    await remove(roleId);
    setRoleId("");
    setRoleName("");
    setIsActive(true);
    setMode("create");
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleString() : "—");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">👤 Roles</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Nombre del Rol"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="accent-blue-600"
          />
          Activo
        </label>
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
          placeholder="ID del rol"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
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

      {role && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md shadow">
          <p>
            <strong>ID:</strong> {role.RoleID}
          </p>
          <p>
            <strong>Nombre:</strong> {role.RoleName}
          </p>
          <p>
            <strong>Activo:</strong> {role.IsActive ? "Sí" : "No"}
          </p>
          <p>
            <strong>Creado:</strong> {formatDate(role.CreatedAt)}
          </p>
          <p>
            <strong>Actualizado:</strong> {formatDate(role.UpdatedAt)}
          </p>
        </div>
      )}
    </div>
  );
}

export default Roles;
