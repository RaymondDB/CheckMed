import { InsuranceNetworkTypeRepositoryImpl } from "../../../infrastructure/repositoriesImpl/InsuranceNetworkTypeImpl";

export async function CreateInsuranceNetworkType(insuranceNetworkType) {
  return await InsuranceNetworkTypeRepositoryImpl.create(insuranceNetworkType.toDTO());
}