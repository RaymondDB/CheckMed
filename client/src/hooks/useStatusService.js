import { useState } from "react";
import { container } from "../di/container";

export function useStatusService() {
  const service = container.statusService;

  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const create = async (data) => {
    try {
      const result = await service.create(data);
      setStatus(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const getById = async (id) => {
    try {
      const result = await service.getById(id);
      setStatus(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const update = async (id, data) => {
    try {
      const result = await service.update(id, data);
      setStatus(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    try {
      await service.delete(id);
      setStatus(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    status,
    error,
    create,
    getById,
    update,
    remove,
    setStatus,
  };
}
