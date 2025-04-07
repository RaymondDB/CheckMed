import { Patient } from "../../models/Patient";
import { PatientRepositoryImpl } from "../../../infrastructure/repositoriesImpl/PatientRepositoryImpl";

export async function GetPatientById(id) {
  const data = await PatientRepositoryImpl.findById(id);
  return Patient.fromDTO(data);
}