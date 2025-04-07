import api from "../api/apiService";

export const DoctorRepositoryImpl = {
  async findAll() {
    const res = await api.get("/doctors");
    return res.data.data;
  },

  async findById(id) {
    const res = await api.get(`/doctors/${id}`);
    return res.data;
  },

  async create(doctorDTO) {
    const res = await api.post("/doctors", doctorDTO);
    return res.data;
  },

  async update(id, doctorDTO) {
    const res = await api.put(`/doctors/${id}`, doctorDTO);
    return res.data;
  },

  async remove(id) {
    const res = await api.delete(`/doctors/${id}`);
    return res.data;
  },
};
