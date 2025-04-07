import { useState } from "react";
import { container } from "../di/container";

export function useNotificationService() {
  const service = container.notificationService;

  const [notification, setNotification] = useState(null);
  const [error, setError] = useState("");

  const create = async (data) => {
    try {
      const result = await service.create(data);
      setNotification(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const getById = async (id) => {
    try {
      const result = await service.getById(id);
      setNotification(result.data);
      return result.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    try {
      await service.delete(id);
      setNotification(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    notification,
    error,
    create,
    getById,
    remove,
    setNotification,
  };
}
