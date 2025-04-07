import { GetAllInsuranceProviders } from "../../domain/usecases/insuranceProviders/GetAllInsuranceProviders";
import { GetInsuranceProviderById } from "../../domain/usecases/insuranceProviders/GetInsuranceProviderById";
import { CreateInsuranceProvider } from "../../domain/usecases/insuranceProviders/CreateInsuranceProvider";
import { UpdateInsuranceProvider } from "../../domain/usecases/insuranceProviders/UpdateInsuranceProvider";
import { DeleteInsuranceProvider } from "../../domain/usecases/insuranceProviders/DeleteInsuranceProvider";
import { InsuranceProviders } from "../../domain/models/insuranceProviders";

export const insuranceProvidersService = {
  async getAll() {
    const insuranceProviders = await GetAllInsuranceProviders();
    return insuranceProviders
  },

  async getById(id) {
    const insuranceProvider = await GetInsuranceProviderById(id);
    return insuranceProvider
  },

  async create(data) {
    const newInsuranceProvider = new InsuranceProviders(data);
    return await CreateInsuranceProvider(newInsuranceProvider);
  },

  async update(id, data) {
    const updateInsuranceProvider = new InsuranceProviders(data);
    return await UpdateInsuranceProvider(id, updateInsuranceProvider);
  },

  async remove(id) {
    return await DeleteInsuranceProvider(id);
  },
};