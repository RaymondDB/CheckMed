import { InsuranceProvidersRepositoryImpl } from "../../../infrastructure/repositoriesImpl/InsuranceProvidersImpl";

export async function CreateInsuranceProvider(insuranceProvider) {
  return await InsuranceProvidersRepositoryImpl.create(insuranceProvider.toDTO());
}