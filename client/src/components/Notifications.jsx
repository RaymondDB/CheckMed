import { useState } from "react";
import {
  createNotification,
  getNotificationById,
  deleteNotification,
} from "../api/notificationsApi";

function Notifications() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [searchId, setSearchId] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setError("");
    if (!userId || !message) {
      setError("UserID y Message son requeridos.");
      return;
    }

    try {
      const res = await createNotification({
        UserID: parseInt(userId),
        Message: message,
      });

      if (res.success === false) {
        setError(res.message || "Error al crear la notificación.");
        return;
      }

      setNotification(res.data);
    } catch (err) {
      setError("Error al conectar con la API.");
    }
  };

  const handleSearch = async () => {
    setError("");
    if (!searchId) {
      setError("Ingresa un ID para buscar.");
      return;
    }

    try {
      const res = await getNotificationById(searchId);
      if (!res.success || !res.data) {
        setError("No se encontró la notificación.");
        setNotification(null);
        return;
      }

      setNotification(res.data);
    } catch (err) {
      setError("Error al buscar la notificación.");
    }
  };

  const handleDelete = async () => {
    setError("");
    if (!searchId) {
      setError("Ingresa un ID para eliminar.");
      return;
    }

    try {
      const res = await deleteNotification(searchId);
      if (!res.success) {
        setError("Error al eliminar.");
        return;
      }

      setNotification(null);
    } catch (err) {
      setError("Error al eliminar la notificación.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Sin fecha";
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">
          Crear Notificación
        </h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            placeholder="UserID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Crear
          </button>
        </div>
      </div>

      <div className="border-t pt-4 space-y-2">
        <h3 className="text-lg font-medium text-gray-700">
          Buscar / Eliminar Notificación
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
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

      {notification && (
        <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Resultado:
          </h4>
          <p>
            <strong>ID:</strong> {notification.NotificationID}
          </p>
          <p>
            <strong>UserID:</strong> {notification.UserID}
          </p>
          <p>
            <strong>Mensaje:</strong> {notification.Message}
          </p>
          <p>
            <strong>Fecha:</strong> {formatDate(notification.SentAt)}
          </p>
        </div>
      )}
    </div>
  );
}

export default Notifications;
