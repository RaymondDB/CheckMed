import { InsuranceProviders } from "../../models/insuranceProviders";
import { InsuranceProvidersRepositoryImpl } from "../../../infrastructure/repositoriesImpl/InsuranceProvidersImpl";

export async function GetAllInsuranceProviders() {
    const data = await InsuranceProvidersRepositoryImpl.findAll();
    return data.map(InsuranceProviders.fromDTO);
}