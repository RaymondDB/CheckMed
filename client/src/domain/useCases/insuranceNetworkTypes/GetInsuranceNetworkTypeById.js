import { InsuranceNetworkType } from "../../models/insuranceNetworkType";
import { InsuranceNetworkTypeRepositoryImpl } from "../../../infrastructure/repositoriesImpl/InsuranceNetworkTypeImpl";

export async function GetInsuranceNetworkTypeById(id) {
    const data = await InsuranceNetworkTypeRepositoryImpl.findById(id);
    return InsuranceNetworkType.fromDTO(data);
}