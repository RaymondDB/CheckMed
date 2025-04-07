import { GetAllInsuranceNetworkTypes } from "../../domain/usecases/insuranceNetworkTypes/GetAllInsuranceNetworkTypes";
import { GetInsuranceNetworkTypeById } from "../../domain/usecases/insuranceNetworkTypes/GetInsuranceNetworkTypeById";
import { CreateInsuranceNetworkType } from "../../domain/usecases/insuranceNetworkTypes/CreateInsuranceNetworkType";
import { UpdateInsuranceNetworkType } from "../../domain/usecases/insuranceNetworkTypes/UpdateInsuranceNetworkType";
import { DeleteInsuranceNetworkType } from "../../domain/usecases/insuranceNetworkTypes/DeleteInsuranceNetworkType";
import { InsuranceNetworkType } from "../../domain/models/insuranceNetworkType";

export const insuranceNetworkTypeService = {
    async getAll() {
      const insuranceNetworkTypes = await GetAllInsuranceNetworkTypes();
      return insuranceNetworkTypes
    },
  
    async getById(id) {
      const insuranceNetworkType = await GetInsuranceNetworkTypeById(id);
      return insuranceNetworkType
    },
  
    async create(data) {
      const newInsuranceNetworkType = new InsuranceNetworkType(data);
      return await CreateInsuranceNetworkType(newInsuranceNetworkType);
    },
  
    async update(id, data) {
      const updateInsuranceNetworkType = new InsuranceNetworkType(data);
      return await UpdateInsuranceNetworkType(id, updateInsuranceNetworkType);
    },
  
    async remove(id) {
      return await DeleteInsuranceNetworkType(id);
    },
  };