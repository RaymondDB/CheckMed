const API_URL = import.meta.env.VITE_API_URL;

export const createStatus = async (data) => {
  const res = await fetch(`${API_URL}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getStatusById = async (id) => {
  const res = await fetch(`${API_URL}/status/${id}`);
  return await res.json();
};

export const updateStatus = async (id, data) => {
  const res = await fetch(`${API_URL}/status/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteStatus = async (id) => {
  const res = await fetch(`${API_URL}/status/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
