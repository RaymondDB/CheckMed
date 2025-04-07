import { InsuranceNetworkTypeRepositoryImpl } from "../../../infrastructure/repositoriesImpl/InsuranceNetworkTypeImpl";

export async function DeleteInsuranceNetworkType(id) {
  return await InsuranceNetworkTypeRepositoryImpl.remove(id);
}