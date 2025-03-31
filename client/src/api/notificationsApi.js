const API_URL = import.meta.env.VITE_API_URL;

export const createNotification = async ({ UserID, Message }) => {
  const response = await fetch(`${API_URL}/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ UserID, Message }),
  });

  return await response.json();
};

export const getNotificationById = async (id) => {
  const response = await fetch(`${API_URL}/notifications/${id}`);
  return await response.json();
};

export const deleteNotification = async (id) => {
  const response = await fetch(`${API_URL}/notifications/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};
