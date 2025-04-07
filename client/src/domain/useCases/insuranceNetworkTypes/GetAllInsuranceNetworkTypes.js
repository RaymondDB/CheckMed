import { InsuranceNetworkType } from "../../models/insuranceNetworkType";
import { InsuranceNetworkTypeRepositoryImpl } from "../../../infrastructure/repositoriesImpl/InsuranceNetworkTypeImpl";

export async function GetAllInsuranceNetworkTypes() {
    const data = await InsuranceNetworkTypeRepositoryImpl.findAll();
    return data.map(InsuranceNetworkType.fromDTO);
}