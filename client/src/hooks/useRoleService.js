import { useState } from "react";
import { container } from "../di/container";

export function useRoleService() {
  const service = container.roleService;

  const [role, setRole] = useState(null);
  const [error, setError] = useState("");

  const create = async (data) => {
    try {
      const result = await service.create(data);
      setRole(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const getById = async (id) => {
    try {
      const result = await service.getById(id);
      setRole(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const update = async (id, data) => {
    try {
      const result = await service.update(id, data);
      setRole(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    try {
      await service.delete(id);
      setRole(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    role,
    error,
    create,
    getById,
    update,
    remove,
    setRole,
  };
}
