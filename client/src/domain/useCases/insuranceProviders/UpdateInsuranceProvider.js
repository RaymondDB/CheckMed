import { InsuranceProvidersRepositoryImpl } from "../../../infrastructure/repositoriesImpl/InsuranceProvidersImpl";

export async function UpdateInsuranceProvider(id, insuranceProvider) {
  return await InsuranceProvidersRepositoryImpl.update(id, insuranceProvider.toDTO());
}