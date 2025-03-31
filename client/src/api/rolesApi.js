const API_URL = import.meta.env.VITE_API_URL;

export const createRole = async (data) => {
  const res = await fetch(`${API_URL}/roles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getRoleById = async (id) => {
  const res = await fetch(`${API_URL}/roles/${id}`);
  return await res.json();
};

export const updateRole = async (id, data) => {
  const res = await fetch(`${API_URL}/roles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteRole = async (id) => {
  const res = await fetch(`${API_URL}/roles/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
