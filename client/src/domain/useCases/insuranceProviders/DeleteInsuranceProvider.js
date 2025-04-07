import { InsuranceProvidersRepositoryImpl } from "../../../infrastructure/repositoriesImpl/InsuranceProvidersImpl";

export async function DeleteInsuranceProvider(id) {
    return await InsuranceProvidersRepositoryImpl.remove(id);
  }