import { Patient } from "../../models/Patient";
import { PatientRepositoryImpl } from "../../../infrastructure/repositoriesImpl/PatientRepositoryImpl";

export async function GetAllPatients() {
  const data = await PatientRepositoryImpl.findAll();
  return data.map(Patient.fromDTO);
}
