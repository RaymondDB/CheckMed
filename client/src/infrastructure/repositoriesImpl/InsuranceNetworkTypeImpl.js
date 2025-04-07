import api from "../api/Apiservice"; 
import { InsuranceNetworkType } from "../../domain/models/insuranceNetworkType";

export const InsuranceNetworkTypeRepositoryImpl = {
    async findAll() {
      const res = await api.get("/insuranceNetworkType");
      const data = res.data.data || res.data;
      console.log(data)
      return data.map(InsuranceNetworkType.fromDTO);
    },
  
    async findById(id) {
      const res = await api.get(`/insuranceNetworkType/${id}`);
      return InsuranceNetworkType.fromDTO(res.data.data || res.data);
    },
  
    async create(insuranceNetworkTypeDTO) {
      const res = await api.post("/insuranceNetworkType", insuranceNetworkTypeDTO);
      return res.data;
    },
  
    async update(id, insuranceNetworkTypeDTO) {
      const res = await api.put(`/insuranceNetworkType/${id}`, insuranceNetworkTypeDTO);
      return res.data;
    },
  
    async remove(id) {
      const res = await api.delete(`/insuranceNetworkType/${id}`);
      return res.data;
    }
  };