import { PatientRepositoryImpl } from "../../../infrastructure/repositoriesImpl/PatientRepositoryImpl";

export async function CreatePatient(patient) {
  return await PatientRepositoryImpl.create(patient.toDTO());
}
