import api from "../api/Apiservice";
import { InsuranceProviders } from "../../domain/models/insuranceProviders";

export const InsuranceProvidersRepositoryImpl = {
    async findAll() {
      const res = await api.get("/insuranceProviders");
      const data = res.data.data || res.data;
      console.log('Respuesta que recibe el repositorio: ',data)
      return data.map(InsuranceProviders.fromDTO);
    },
  
    async findById(id) {
      const res = await api.get(`/insuranceProviders/${id}`);
      return InsuranceProviders.fromDTO(res.data.data || res.data);
    },
  
    async create(insuranceProvidersDTO) {
      const res = await api.post("/insuranceProviders", insuranceProvidersDTO);
      return res.data;
    },
  
    async update(id, insuranceProvidersDTO) {
      const res = await api.put(`/insuranceProviders/${id}`, insuranceProvidersDTO);
      return res.data;
    },
  
    async remove(id) {
      const res = await api.delete(`/insuranceProviders/${id}`);
      return res.data;
    }
  };