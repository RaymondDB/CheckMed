import api from "../api/apiService"; // Asegúrate de que esta ruta coincida
import { User } from "../../domain/models/User";

export const UserRepositoryImpl = {
  async findAll() {
    const res = await api.get("/users");
    const data = res.data.data || res.data;
    return data.map(User.fromDTO);
  },

  async findById(id) {
    const res = await api.get(`/users/${id}`);
    return User.fromDTO(res.data.data || res.data);
  },

  async create(userDTO) {
    const res = await api.post("/users", userDTO);
    return res.data;
  },

  async update(id, userDTO) {
    const res = await api.put(`/users/${id}`, userDTO);
    return res.data;
  },

  async remove(id) {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  }
};
