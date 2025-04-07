import { useState } from "react";
import { useNotificationService } from "../../hooks/useNotificationService";

function Notifications() {
  const { notification, error, create, getById, remove, setNotification } =
    useNotificationService();

  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [searchId, setSearchId] = useState("");

  const handleCreate = async () => {
    await create({ UserID: parseInt(userId), Message: message });
  };

  const handleSearch = async () => {
    await getById(searchId);
  };

  const handleDelete = async () => {
    await remove(searchId);
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleString() : "Sin fecha");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">📩 Notificaciones</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="number"
          placeholder="UserID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Crear
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="number"
          placeholder="ID para buscar o eliminar"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
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

      {notification && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md shadow">
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
            <strong>Enviado:</strong> {formatDate(notification.SentAt)}
          </p>
        </div>
      )}
    </div>
  );
}

export default Notifications;
