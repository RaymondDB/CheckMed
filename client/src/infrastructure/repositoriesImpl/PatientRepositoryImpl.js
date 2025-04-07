import api from "../api/apiService";

export const PatientRepositoryImpl = {
  async findAll() {
    const res = await api.get("/patients");
    return res.data.data;
  },

  async findById(id) {
    const res = await api.get(`/patients/${id}`);
    return res.data;
  },

  async create(patientDTO) {
    const res = await api.post("/patients", patientDTO);
    return res.data;
  },

  async update(id, patientDTO) {
    const res = await api.put(`/patients/${id}`, patientDTO);
    return res.data;
  },

  async remove(id) {
    const res = await api.delete(`/patients/${id}`);
    return res.data;
  },
};
