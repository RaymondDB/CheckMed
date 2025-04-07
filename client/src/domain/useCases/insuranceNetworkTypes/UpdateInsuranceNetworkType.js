import { InsuranceNetworkTypeRepositoryImpl } from "../../../infrastructure/repositoriesImpl/InsuranceNetworkTypeImpl";

export async function UpdateInsuranceNetworkType(id, insuranceNetworkType) {
  return await InsuranceNetworkTypeRepositoryImpl.update(id, insuranceNetworkType.toDTO());
}