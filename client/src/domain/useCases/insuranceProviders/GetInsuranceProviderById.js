import { InsuranceProviders } from "../../models/insuranceProviders";
import { InsuranceProvidersRepositoryImpl } from "../../../infrastructure/repositoriesImpl/InsuranceProvidersImpl";

export async function GetInsuranceProviderById(id) {
    const data = await InsuranceProvidersRepositoryImpl.findById(id);
    return InsuranceProviders.fromDTO(data);
}